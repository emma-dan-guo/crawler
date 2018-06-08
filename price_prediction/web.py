from flask import Flask
from flask import request
from sklearn.externals import joblib
import numpy as np

app = Flask(__name__)
clf = joblib.load("model.m")
# need to revise if model was updated
mean = 77.68
maximum = 5233
minimum = 8


@app.route("/")
def hello():
    return "Hello Dandan,I'm QingQing!"


@app.route("/predict", methods=["POST"])
def predict():
    areas = request.values.get("areas", None)
    square = request.values.get("square", None)
    direction = request.values.get("direction", None)
    if None in [areas, square, direction]:
        return "{price:0}"
    else:
        square = (int(square) - mean) / (maximum - minimum)
        areas = int(areas) / 5
        direction = int(direction) / 4
        x = np.array([areas, square, direction]).reshape(1, -1)
        r = clf.predict(x)[0]
        return "{price:" + str(r) + "}"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
