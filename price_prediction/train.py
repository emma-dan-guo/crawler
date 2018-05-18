
import pandas
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing
from sklearn.kernel_ridge import KernelRidge
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVR
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.externals import joblib
from sklearn.utils import shuffle


def normalization(data,tag=""):
    mean = data.mean()
    maximum = data.max()
    minimum = data.min()
    print(tag,mean,maximum,minimum)
    return (data - mean) / (maximum - minimum)


df = pandas.read_csv("index.csv")
df = shuffle(df)
df = shuffle(df)
square = df['square'].values
square = normalization(square)
areas = df['areas'].values / 5
direction = df['direction'].values / 4
price = df['price'].values
#price = normalization(price)


print(areas.shape,square.shape,direction.shape)
data = np.array([areas,square,direction])
data = data.T
train_fraction = .8
train_number = int(df.shape[0] * train_fraction)
X_train = data[:train_number]
X_test = data[train_number:]
y_train = price[:train_number]
y_test = price[train_number:]

print(np.max(price))

# model
clf = GridSearchCV(SVR(kernel='rbf', gamma=0.1),{"C": [1e0, 1e1, 1e2, 1e3], "gamma": np.logspace(-2, 2, 5)},cv=5)
#clf = GridSearchCV(LogisticRegression(),{"C":[1e0,1e1,1e2,1e3],"random_state":list(range(10))},cv=5)
#clf = GridSearchCV(KernelRidge(kernel='rbf', gamma=0.1), {"alpha": [1e0, 1e1, 1e2, 1e3], "gamma": np.logspace(-2, 2, 5)},cv=5)
clf.fit(X_train,y_train)
result = clf.score(X_train,y_train)
test = clf.score(X_test,y_test)

c = clf.best_params_
y = clf.predict(X_test)
x = list(range(len(y)))
plt.subplot(2,1,1)
plt.scatter(x=x,y=y,color='r')
plt.scatter(x=x,y=y_test,color='g')

print(clf.best_params_,result,test)

deviation = y - y_test
deviation = deviation.flatten()
deviation = abs(deviation)
print(np.median(deviation))
plt.subplot(2,1,2)
plt.hist(deviation,10)
joblib.dump(clf,"model.m")
plt.show()
