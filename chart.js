/*
function newDate(days) {
    return moment().add(days, 'd').toDate();
}
function newDateString(days) {
    return moment().add(days, 'd').format('llll');
}
*/

// Machine Learning
var ml = document.getElementById('machineLearning').getContext('2d');
        var maliciousPackets = new Chart(ml, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "HTTP Packet ",
                    backgroundColor: "#fff",
                    borderColor: "#11aadd",
                    fill: true,
                    pointRadius: 5,
                    borderWidth: 2,
                    //pointBackgroundColor: "rgba(0, 23, 248, 0.3)",
                    pointBackgroundColor: "rgba(0, 23, 248, 0.8)",
                    strokeColor: "#fff",
                    //backgroundColor: "rgba(120, 220, 201, 0.3)",
                    backgroundColor: "rgba(0, 37, 78, 0.8)",
                    data: [],
                    pointHighlightStroke: "#222"
                },     
            ]},  
            options: {
                events: ["click"],
				responsive: true,
				title:{
                    display:true,
                    fontColor: '#FFFFFF',
                    fontSize: 15,
					text:"MACHINE LEARNING ANALYSIS | Displaying Malicious Requests Only"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },               
                plugins: {
                    streaming: {
                        duration: 120000,
						refresh: 2000,
						delay: 2000,              
                        onRefresh: function(chart, sizepacket, packetSrc) {
                            if(sizepacket > 0){            
                            chart.data.datasets.forEach(function(dataset) {              
                                dataset.data.push({              
                                    x: Date.now(),
                                    y: (sizepacket/1024).toFixed(3)             
                                });              
                            });
                        }          
                        }              
                    },
                },
                tooltips: {
                    mode: 'label',
                    backgroundColor: '#000',
                    callbacks: {
                       label: function(tooltipItem, data, path) {
                            var label = data.labels[tooltipItem.index];
                            return 'SRC IP: ' + label.ipSource + ' - Path : ' + label.fullPath + ' - KB: ' + tooltipItem.yLabel;
                       }
                    }
                 }, 
				scales: {
                    pointLabels: {fontSize: 50},
					xAxes: [{
                        time: {
                            unit: 'second',
                        },
                        ticks: {
                            fontColor: '#FFFFFF',
                            fontSize: 13,
                        },
                        gridLines: {
                            display: true,
                            //color: 'rgba(171,171,171, 0.1)',
                            color: 'rgba(255,255,255, 0.6',
                        },
						type: "realtime",
                        display: true,
						scaleLabel: {
							display: true,
                            labelString: 'T I M E',
                            fontStyle: 'bold',
                            fontColor: "#FFFFFF"
						},
                        major: {
                            fontStyle: "bold",
                            fontColor: "#FF0000",
                            fontColor: "red"
                            }
					}],
					yAxes: [{
                        display: true,
                        gridLines: {
                            color: 'rgba(255,255,255, 0.6)'
                            //color: 'rgba(171,171,171, 0.1)',
                        },
                        scaleLabel: {
                            display: true,
                            fontStyle: 'bold',
                            labelString: 'P A C K E T   S I Z E   (KB)',
                            fontColor: '#FFFFFF'
                        },
                        ticks: {
                            fontColor: '#FFFFFF',
                            fontSize: 13,
                        },
					}]
				}
			}
        });


 // BİRİNCİ GRAFİK
var ctx3 = document.getElementById('inComingTraffic').getContext('2d');
        var inComingPacket = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "HTTP Packet ",
                    borderColor: "#fff",
                    fill: true,
                    pointRadius: 5,
                    borderWidth: 2,
                    pointBackgroundColor: "rgba(0, 23, 248, 0.3)",
                    strokeColor: "#fff",
                    //backgroundColor: "rgba(120, 220, 201, 0.3)",
                    backgroundColor: "rgba(0, 37, 78, 0.7)",
                    data: [],
                    pointHighlightStroke: "#222"
                },     
            ]},  
            options: {
                events: ["click"],
				responsive: true,
				title:{
                    display:true,
                    fontColor: '#FFF',
                    fontSize: 15,
                    text:"INCOMING HTTP TRAFFIC"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },                   
                plugins: {
                    streaming: {
                        duration: 120000,
						refresh: 2000,
						delay: 2000,              
                        onRefresh: function(chart, sizepacket, packetSrc) {
                            if(sizepacket > 0){            
                            chart.data.datasets.forEach(function(dataset) {              
                                dataset.data.push({              
                                    x: Date.now(),
                                    y: (sizepacket/1024).toFixed(3)             
                                });              
                            });
                        }          
                        }              
                    },
                },
                tooltips: {
                    mode: 'label',
                    backgroundColor: '#000',
                    callbacks: {
                       label: function(tooltipItem, data, path) {
                            var label = data.labels[tooltipItem.index];
                            return 'SRC IP: ' + label.ipSource + ' - PATH: '+label.fullPath +' - KB: ' + tooltipItem.yLabel;
                       }
                    }
                 }, 
				scales: {
                    pointLabels: {fontSize: 40},
					xAxes: [{
                        time: {
                            unit: 'second'
                        },
                        ticks: {
                            fontColor: '#FFFFFF',
                        },
                        gridLines: {
                            //color: 'rgba(171,171,171, 0.1)',
                            color: 'rgba(255,255,255, 0.5)',
                        },
						type: "realtime",
                        display: true,
						scaleLabel: {
                            display: true,
                            fontStyle: 'bold',
                            fontColor: '#FFF',
                            labelString: 'T I M E',
						},
                        major: {
                            fontStyle: "bold",
                            fontColor: "#FF0000"
                            }
					}],
					yAxes: [{
                        display: true,
                        gridLines: {
                            color: 'rgba(255,255,255, 0.6)',
                        },
                        ticks: {
                            fontColor: "#111",
                            fontSize: 13,
                        },
                        scaleLabel: {
                            display: true,
                            fontColor: '#FFF',
                            fontStyle: 'bold',
							labelString: 'P A C K E T S I Z E   (KB)'
						}
					}]
				}
			}
        });




        // İKİNCİ GRAFİK
        var ctx4 = document.getElementById('outGoingTraffic').getContext('2d');
        var outGoingPacket = new Chart(ctx4, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "HTTP Packet",
                    backgroundColor: "#11aadd",
                    borderColor: "#11aadd",
                    fill: true,
                    pointRadius: 5,
                    borderWidth: 2,
                    pointBackgroundColor: " rgba(170, 0, 0, 0.3)",
                    strokeColor: "#fff",
                    //--backgroundColor: "rgba(11, 95, 109, 0.5)",
                    backgroundColor: "rgba(125, 36, 167, 0.3)",
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 0,
                    data: []
                }]
            },           
            options: {
                events: ["click"],
				responsive: true,
				title:{
                    display:true,
                    fontColor: '#FFF',
                    fontSize: 15,
					text:"OUTGOING HTTP TRAFFIC"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },                   
                plugins: {
                    streaming: {
                        duration: 120000,
						refresh: 2000,
						delay: 3000,              
                        onRefresh: function(chart, sizepacket) {
                            if(sizepacket > 0){            
                            chart.data.datasets.forEach(function(dataset) {              
                                dataset.data.push({              
                                    x: Date.now(),
                                    y: (sizepacket/1024).toFixed(3)             
                                });              
                            });
                        }          
                        }              
                    },
                },
                tooltips: {
                    mode: 'label',
                    backgroundColor: "#000",
                    callbacks: {
                       label: function(tooltipItem, data) {
                            var label = data.labels[tooltipItem.index];
                            console.log(label);
                            return 'DEST IP: ' + label.ipDest +" - " +"\n"+ label.path+" - KB: " + tooltipItem.yLabel;
                       }
                    }
                 }, 
				scales: {
					xAxes: [{
                        time: {
                            unit: 'second'
                        },
                        gridLines: {
                            display: true,
                            color: 'rgba(255,255,255, 0.7)'
                        },
						type: "realtime",
						display: true,
						scaleLabel: {
                            display: true,
                            fontStyle: 'bold',
                            fontColor: '#FFF',
							labelString: 'T I M E'
						},
                        ticks: {
                            major: {
                                fontStyle: "bold",
                                fontColor: "#FFF"
                            },
                           fontColor: '#FFF'
                        }
					}],
					yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            color: 'rgba(255,255,255, 0.6)'
                        },
						scaleLabel: {
                            display: true,
                            fontColor: '#FFF',
                            fontStyle: 'bold',
							labelString: 'PACKET SIZE  (KB)'
                        },
                        ticks: {
                            fontColor: '#FFF',
                            fontSize: 13,
                        }
					}]
				}
			}
        });





        // ÜÇÜNCÜ GRAFİK
        var ctx2 = document.getElementById('outGoingTrafficMethod').getContext('2d');
        var outGoingChartMethod = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ["GET", "POST", "OPTIONS", "TRACE", "DELETE", "PUT", "HEAD", "CONNECT"],
                datasets: [{
                    label: "Number of Requests",
                    pointRadius: 5,
                    borderWidth: 1,
                    pointHighlightStroke: "#11aadd",
                    strokeColor: "#11aadd",
                    pointColor: "#669",
                    fill: true,
                    backgroundColor: "rgba(0, 102, 255, 0.2)",
                    borderColor: "#999",
                    data: [0,0,0,0,0,0,0,0],
                }]
            },
            options: {
                title:{
                    display:true,
                    fontColor: '#FFF',
                    fontSize: 15,
					text:"NUMBER OF OUTGOING HTTP METHOD"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },   
                display: true,    
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fontColor: '#FFF'
                        },
                    }],
                    scaleLabel: {
                        fontColor: '#FFF',
                    },
                    xAxes: [{
                        ticks: {
                            fontColor: '#FFF'
                        },
                    }]
                }
            }
        });





        var ctx = document.getElementById('inComingTrafficMethod').getContext('2d');
        var inComingChartMethod = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["GET", "POST", "OPTIONS", "TRACE", "DELETE", "PUT", "HEAD", "CONNECT"],
                datasets: [{
                    label: "Number of Requests",
                    backgroundColor: "rgba(86,61,124,0.2)",
                    pointRadius: 5,
                    borderWidth: 1,
                    borderColor: "#999",
                    data: [0,0,0,0,0,0,0,0],
                    
                }]
            },
            options: {
                title:{
                    display:true,
                    fontColor: '#FFF',
                    fontSize: 15,
					text:"NUMBER OF INCOMMING HTTP METHOD"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },      
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fontColor: '#FFF',
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#FFF'
                        }
                    }]
                }
            }
        });
        
        
  
        
        // 4. GRAFİK      
        var ctx5 = document.getElementById('pieChartMethod').getContext('2d');
        var pieChartMethod = new Chart(ctx5, {
            type: 'doughnut',
            data: {
                labels: ["GET", "POST", "OPTIONS", "TRACE", "DELETE", "PUT", "HEAD", "CONNECT"],
                datasets: [{
                    label: "musana",
                    borderColor: "#11aadd",
                    pointRadius: 5,
                    borderWidth: 1,
                    fill: true,
                    pointBackgroundColor: "#662211",
                    strokeColor: "#fff",
                    backgroundColor: ["rgba(120, 150, 0, 0.3)", "rgba(110, 250, 80, 0.3)", "rgba(110, 20, 120, 0.3)", "rgba(50, 150, 251, 0.3)",
                    "rgba(0, 220, 111, 0.3)","rgba(190, 20, 111, 0.3)", "rgba(0, 200, 251, 0.3)", "rgba(0, 30, 51, 0.3)"],
                    data: [0,0,0,0,0,0,0,0]
                }]
            },           
            options: {
				responsive: true,
				title:{
                    display:true,
                    fontColor: '#FFF',
                    fontSize: 15,
					text:"STATISTICS OF METHODS"
                },
                legend: {
                    labels: {
                        fontColor: '#FFF',
                    }
                },           
				scales: {
					xAxes: [{
                        time: {
                            unit: 'second'
                        },
						display: true,
						scaleLabel: {
                            display: true,
                            fontColor: '#FFF',
						},
                        ticks: {
                            fontColor: '#FFF',
                            major: {
                                fontStyle: "bold",
                                fontColor: "#FFF"
                            }
                        }
					}],
					yAxes: [{
						display: true,
                        ticks: {
                            fontColor: '#FFF'
                        }
					}]
				}
			}
        });
        


        // WEBSOCKET BAĞLANTISI YAPILIYOR.
        var ws = new WebSocket("ws://192.168.1.108:5678");
        ws.onopen = function() {
            //document.getElementById("info").innerHTML = "Bağlantı başarılı...";            
        }
        
        var totalinComingTraffic = 0;
        var totalOutgoingTraffic = 0;

        messages = document.createElement('ul');
        
        // WEBSOCKET BAĞLANTISI BAŞARIYLA KURULDUKTAN SONRA BİR VERİ KARŞIDAN BURAYA GÖNDERİLDİĞİNDE AŞAĞIDAKİ
        // FONKSİYON TETİKLENECEKTİR. AŞAĞIDAKİ FONKSİYON GELEN VERİYİ YAKALAYIP GEĞERLERİNİ YUKARUDAKİ GRAFİKLERE 
        // GÖNDERMEKTEDİR.
        ws.onmessage = function (event) {
            /*
            var messages = document.getElementsByTagName('ul')[0],
            message = document.createElement('li'),
            content = document.createTextNode(event.data);
            message.appendChild(content);
            messages.appendChild(message);
            */
            //veri ekleme            
            console.log(event.data);
            networkPacket = JSON.parse(event.data);
            // YAKALANAN PAKET MAKİNEYE GELEN BİR PAKET İSE İLGİLİ DEĞERLERİ İLGİLİ GRAFİKLERE GÖNDERİYOR.
            if("GelenPaket" in networkPacket){
                // Machine Learning Section
                if (networkPacket.GelenPaket.machineLearning.mlResult == "bad"){
                    console.log(networkPacket.GelenPaket.machineLearning.mlUrl);
                    console.log(networkPacket.GelenPaket.machineLearning.mlResult);
                    maliciousPackets.data.labels.push({"ipSource":networkPacket.GelenPaket.ipSource, "fullPath":networkPacket.GelenPaket.fullPath});
                    maliciousPackets.options.plugins.streaming.onRefresh(maliciousPackets, networkPacket.GelenPaket.packetSize, networkPacket.GelenPaket.ipSource);

                }
                if (!inComingChartMethod.data.labels.includes(networkPacket.GelenPaket.ipSource)) {
                    switch (networkPacket.GelenPaket.httpMethod) {
                        case "GET":
                        inComingChartMethod.data.datasets[0].data[0]+=1; // İlgili metoda ait istek artırılıyor.
                        //inComingChartMethod.data.datasets[0].data[inComingChartMethod.data.labels.indexOf(networkPacket.GelenPaket.ipSource)]+=networkPacket.GelenPaket.packetSize;
                        inComingChartMethod.update(); 
                        pieChartMethod.data.datasets[0].data[0]+=1;
                        pieChartMethod.update();                 
                        break;

                        case "POST":
                        inComingChartMethod.data.datasets[0].data[1]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[1]+=1;
                        pieChartMethod.update();
                        document.getElementById("postData").innerHTML +=  networkPacket.GelenPaket.postData+"<br>";                                
                        break;

                        case "OPTIONS":
                        inComingChartMethod.data.datasets[0].data[2]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[2]+=1;
                        pieChartMethod.update();
                        break;

                        case "TRACE":
                        inComingChartMethod.data.datasets[0].data[3]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[3]+=1;
                        pieChartMethod.update();
                        break;

                        case "DELETE":
                        inComingChartMethod.data.datasets[0].data[4]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[4]+=1;
                        pieChartMethod.update();
                        break;

                        case "PUT":
                        inComingChartMethod.data.datasets[0].data[5]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[5]+=1;
                        pieChartMethod.update();
                        break;

                        case "HEAD":
                        inComingChartMethod.data.datasets[0].data[6]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[6]+=1;
                        pieChartMethod.update();
                        break;

                        case "CONNECT":
                        inComingChartMethod.data.datasets[0].data[7]+=1;    
                        inComingChartMethod.update();   
                        pieChartMethod.data.datasets[0].data[7]+=1;
                        pieChartMethod.update();
                        break;

                        
                        
                        default:
                        break;
                    }   
                }else{
                    //inComingChartMethod.data.labels.push(networkPacket.GelenPaket.ipSource);
                    inComingChartMethod.data.datasets[0].data.push(networkPacket.GelenPaket.packetSize);
                    inComingChartMethod.update();
                }             
                inComingPacket.options.plugins.streaming.onRefresh(inComingPacket, networkPacket.GelenPaket.packetSize, networkPacket.GelenPaket.ipSource);
                inComingPacket.data.labels.push({"ipSource":networkPacket.GelenPaket.ipSource, "fullPath":networkPacket.GelenPaket.fullPath});

                // 1048576 == 2^20 == MB
                //totalinComingTraffic = parseFloat(document.getElementById("gelen").dataset.value)
                totalinComingTraffic += networkPacket.GelenPaket.packetSize/1048576;
                console.log(networkPacket.GelenPaket.packetSize);
                document.getElementById("totalIncomingTraffic").innerHTML = totalinComingTraffic.toFixed(3)+" MB";
            // YAKALANAN PAKET MAKİNEMİZDEN CIKAN BİR PAKET İSE İLGİLİ DEĞERLERİ İLGİLİ GRAFİKLERE GÖNDERİYORUZ.
            }else if("GidenPaket" in networkPacket){
                outGoingPacket.data.labels.push({"ipDest":networkPacket.GidenPaket.ipDest, "path":networkPacket.GidenPaket.host+networkPacket.GidenPaket.url});
                outGoingPacket.options.plugins.streaming.onRefresh(outGoingPacket, networkPacket.GidenPaket.GidenPacketSize);
                totalOutgoingTraffic += networkPacket.GidenPaket.GidenPacketSize/1048576;
                document.getElementById("totalOutgoingTraffic").innerHTML = totalOutgoingTraffic.toFixed(3)+" MB";
                
                //outGoingPacket.options.tooltips.callbacks.label( "musana");
                switch (networkPacket.GidenPaket.httpMethod) {
                    case "GET":
                    outGoingChartMethod.data.datasets[0].data[0]+=1; // İlgili metoda ait istek artırılıyor.
                    outGoingChartMethod.update();        
                    pieChartMethod.data.datasets[0].data[0]+=1;
                    pieChartMethod.update();                 
                    break;

                    case "POST":
                    outGoingChartMethod.data.datasets[0].data[1]+=1;    
                    outGoingChartMethod.update();      
                    pieChartMethod.data.datasets[0].data[1]+=1;
                    pieChartMethod.update();
                    document.getElementById("postData").innerHTML +=  networkPacket.Giden.postData+"<br>";                                
                    break;

                    case "OPTIONS":
                    outGoingChartMethod.data.datasets[0].data[2]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[2]+=1;
                    pieChartMethod.update();
                    break;

                    case "TRACE":
                    outGoingChartMethod.data.datasets[0].data[3]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[3]+=1;
                    pieChartMethod.update();
                    break;

                    case "DELETE":
                    outGoingChartMethod.data.datasets[0].data[4]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[4]+=1;
                    pieChartMethod.update();
                    break;

                    case "PUT":
                    outGoingChartMethod.data.datasets[0].data[5]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[5]+=1;
                    pieChartMethod.update();
                    break;

                    case "HEAD":
                    outGoingChartMethod.data.datasets[0].data[6]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[6]+=1;
                    pieChartMethod.update();
                    break;

                    case "CONNECT":
                    outGoingChartMethod.data.datasets[0].data[7]+=1;    
                    outGoingChartMethod.update();   
                    pieChartMethod.data.datasets[0].data[7]+=1;
                    pieChartMethod.update();
                    break;    
                
                default:
                break;
                    }
            }
        
            //inComingPacket.data.datasets[0].data.push({["x"]: newDateString(0), ["y"]: x.packetSize});
            //--inComingPacket.update();
            //inComingPacket.data.datasets[0].data.push({["y"]: x.packetSize});

            //outGoingChartMethod.data.datasets.label.push(x.ipSource);
            //outGoingChartMethod.data.datasets.data.
            // Metodlara Göre Ayırma
            /*
            inComingChartMethod.data.datasets.forEach((dataset) => {
                dataset.data.push(x.Host);
            });
            inComingChartMethod.update();
            */
        }
        //document.body.appendChild(messages);
        
        
