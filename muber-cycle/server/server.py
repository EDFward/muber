import math
import random

from flask import Flask, jsonify, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ontrip = False

@app.route('/surge')
def surge():
    data = {}
    for i in xrange(7):
        data[i] = float(
            '{:.1f}'.format(random.random() * 3 + 1.1))
    return jsonify(data)

@app.route('/offer')
def offer():
    data = {}
    if random.random() < 0.7:
        data['target'] = math.floor(random.random() * 6) + 1
    return jsonify(data)

@app.route('/dispatch')
def dispatch():
    global ontrip
    prev = bool(ontrip)
    ontrip = not ontrip
    return jsonify({'ontrip': prev})

if __name__ == '__main__':
    app.run()
