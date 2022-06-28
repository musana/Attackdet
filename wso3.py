import tornado.web
import tornado.websocket
import tornado.ioloop
import argparse
import datetime
from datetime import timedelta
import logging
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)
from scapy.all import *
import url_detection_ml as ml

#DIŞARDAN PARAMETRE ALMAK İÇİN. (aldığımız parametre mac adresidir.)
parser = argparse.ArgumentParser(description="musana")
parser.add_argument("-m", "--host", dest="host", required=True, type=str, help="Add server ip address")
parser.add_argument("-i", "--iface", dest="iface", required=True, type=str, help="Add server ip address")
args = parser.parse_args()

class WebSocketHandler(tornado.websocket.WebSocketHandler):
	# TO DO : mac and ip choice. (optional)
	# TO DO : bytelardan dolayı parsing uyarısı.
	def check_origin(self, origin):
		return True

    # websocket bağlantısı başarıyla açılırsa bu method çalışır.
	def open(self):
		print("[*] New Client Connected!")
		self.write_message("You are connected")
		tornado.ioloop.IOLoop.instance().add_timeout(timedelta(seconds=3), self.x) # x metodunu 3 saniyede bir calıstır.

	# web socket bağlantısı kapatılırsa bu method çalışır.
	def on_close(self):
		print("[!] Disconnected!")

	# wlp9s0 (wifi) ağ kartımızın 80 portuna gelen tüm tcp trafiğini yakala
	def x(self):
		print("[*] Sniffing is Started!")
		sniff(iface=args.iface, prn=self.callback, filter="tcp and port 80")

	#packet[1][TCP].load = packet[Raw].load
	# YAKALANAN PAKETİN DEST ADRESİ BİZİM MACMİ VE BİR TCP PAKETİ Mİ VE İÇERİSİNDE DATA(VERİ) VARMI DİYE KONTROL EDİYORUZ.
	# EĞER BU ŞARTLAR SAĞLANIRSA O ZAMAN PAKETİMİZ "PARSEHTTPHEADER" VE "PARSERESPONSEHEADER" METODLARINA İŞLENMEK ÜZERE
	# VERİLECEK. 
	def callback(self, packet):
		methods = ["GET", "POST", "OPTIONS", "TRACE", "DELETE", "PUT", "HEAD", "CONNECT"]
		# BU İF BLOGU GELEN BÜTÜN HTTP PAKETLERİ İÇİNDİR.
		if packet.getlayer(Ether).dst == args.host:
			if packet.haslayer(TCP):
				if packet.dport == 80:
					if packet.haslayer(Raw):
						raw = packet[Raw].load
						#print(raw)
						for method in methods:
							if method in str(raw):
								self.parseHTTPHeader(str(raw), method, packet[IP].src, len(packet[1][TCP].load))
				#GELEN PAKETİN 80. PORTAN MI GELİYOR VE PAKETİN İÇİNDE VERİ VAR MI ? #print(packet.sprintf("%IP.len%"))
				elif packet.sport == 80 and packet.haslayer(Raw):
					raw = packet[Raw].load
					self.parseResponseHeader(packet[IP].src, len(raw))

		# BU İF BLOĞI GİDEN BÜTÜN HTTP PAKETLERİ İÇİNDİR.
		if packet.getlayer(Ether).src == args.host:
			if packet.haslayer(TCP):
				if packet.dport == 80:
					if packet.haslayer(Raw):
						raw = packet[Raw].load
						for method in methods:
							if method in str(raw):
								tempParse = str(raw).split(r"\r\n")
								url = tempParse[0].split(" ")[1]
								host = tempParse[1].split(" ")[1]

								gidenPacket = {"GidenPaket":{
									"GidenPacketSize":len(packet[1][TCP].load), 
									"ipDest": packet[IP].dst,
									"url": url,
									"host": host,
									"httpMethod": method}}
								
								if method == "POST":
									post = str(raw).split(r"\r\n\r\n")[1]
									gidenPacket["GidenPaket"]["postData"] = post
									
								self.write_message(gidenPacket)
		"""					
		if packet.getlayer(Ether).src == args.host:
			print(packet)
			gidenPacket = {"GidenPacketSize":len(packet[1][TCP])}
			self.write_message(gidenPacket)
		"""


	# GELEN PAKET AYRIŞTIRILIYOR.	
	def parseResponseHeader(self, ipSource, sizePacket):
		networkPacket = {"GelenPaket":{}}
		networkPacket["GelenPaket"]["ipSource"] 	= ipSource
		networkPacket["GelenPaket"]["packetSize"] 	= sizePacket
		self.write_message(networkPacket)

	# GELEN PAKET BİZE LAZIM OLAN BİLGİLER İÇİN AYRIŞTIRILIYOR.
	def parseHTTPHeader(self, header, method, ipSource, sizePacket):
		networkPacket = {"GelenPaket": {"HTTPHeader": {}, "postData":{}}}
		machineLearningResult = {}
		urlForMl = [] 

		# GELEN PAKET POST METODU İLE GELMİŞ İSE POST VERİSİNİ AL VE "NETWORKPACKET" DEĞİŞKENİNE ATA
		if method == "POST":
			post = list(filter(None, header.split(r"\r\n\r\n")))
			networkPacket["GelenPaket"]["postData"] = post[1]

		httpHeader  = list(filter(None, header.split(r"\r\n")))
		for i in httpHeader[1:-1]:
			networkPacket["GelenPaket"]["HTTPHeader"][i.split(":")[0].strip()] = i.split(":")[1].strip()
		networkPacket["GelenPaket"]["httpMethod"] 	= method
		networkPacket["GelenPaket"]["ipSource"]		= ipSource
		networkPacket["GelenPaket"]["url"] 			= httpHeader[0]
		networkPacket["GelenPaket"]["packetSize"]	= sizePacket
		#HTTPheader["header"] = str(httpHeader[0]) # method ve path bilgisi: GET / HTTP/1.1
		#self.write_message(httpHeader[0][2:]) # exclusion b'
		path_ 	  = str(networkPacket["GelenPaket"]["url"])[2:].split()[1]
		fullpath_ = networkPacket["GelenPaket"]["HTTPHeader"]["Host"]+path_
		networkPacket["GelenPaket"]["fullPath"]	= fullpath_
		urlForMl.append(fullpath_)
		predictML = ml.predictUrl(urlForMl)
		networkPacket["GelenPaket"]["machineLearning"] = {"mlUrl":urlForMl[0], "mlResult": predictML[0]}
		#print(urlForMl)
		#print("URL :",urlForMl, "- ML RESULT:", ml.predict(urlForMl))
		#GELEN PAKET AYRIŞTIRILIP BİZE LAZIM OLAN BÜTÜN VERİLER "NETWORKPACKET" DEĞİŞKENİNİN İÇİNE KONULDUKTAN SONRA WEBSOCKET BAĞLANTISI KURULAN ADRESE GÖNDERİLİYOR.
		print('[+] Predict of ML:', *predictML, "\t URL:", fullpath_)
		self.write_message(networkPacket)
		


application = tornado.web.Application([
    #(r"/", WebSocketHandler),
	(r"/", WebSocketHandler),
])


if __name__ == "__main__":
	print("[*] Training Machine Learning Model...")
	#ml.training()
	ml.loadModel()
	print("[*] Training of Machine Learning Model is Over...")
	print("[*] Waiting for WebSocket Connection...")
	application.listen(5678)
	try:
		tornado.ioloop.IOLoop.instance().start()
	except KeyboardInterrupt:
		print("[*] Process is Interrupted by User!")
	
