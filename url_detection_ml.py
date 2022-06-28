from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import pickle as pk
import pandas as pd

def training():
    url_data = pd.read_csv('datasets/urldata.csv')
    url_data.reset_index(drop=True)

    #print(url_data.shape) # 420.464, 2
    #print(url_data[url_data['label']=='bad'][:11]) // Şart belirlenebilir.

    output  = url_data['label']
    urlList = url_data['url']

    vektor  = TfidfVectorizer()
    input_  = vektor.fit_transform(urlList)
    #print(input_)    
    saveModel(vektor, "datasets/urlModelVektor.pickle")

    X_train, X_test, y_train, y_test = train_test_split(input_, output, test_size=0.2, random_state=42)

    training_data = {"X_train": X_train, "y_train": y_train}
    saveModel(training_data, "datasets/urlModelTrainingData.pickle")

    logreg = LogisticRegression()	
    logreg.fit(X_train, y_train)
    #print("Accuracy ",logreg.score(X_test, y_test))
    saveModel(logreg, "datasets/urlModel.pickle")

def saveModel(model, file_name):
    file_ = open(file_name, 'wb')
    pk.dump(model, file_)
    file_.close()

def loadModel():
    global vektor
    vektor = pk.load(open('datasets/urlModelVektor.pickle', 'rb'))
    global logreg
    logreg = pk.load(open('datasets/urlModel.pickle', 'rb'))
    global traning_data
    traning_data = pk.load(open('datasets/urlModelTrainingData.pickle', 'rb'))
    score = logreg.score(traning_data['X_train'], traning_data['y_train'])
    print('[*] Training Score (Percent): ', "{0:.2f}".format(100*score), ' / Float : ', score,)

def predictUrl(url):
    #predict = ['adeosecurity.com', 'musana.com', 'alparslan.edu.tr']
    pre = vektor.transform(url)
    return logreg.predict(pre)
