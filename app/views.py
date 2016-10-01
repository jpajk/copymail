from app import app
from flask import render_template, jsonify


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/copymail', methods=['POST'])
def handleAjax():
    res = {
        'status': 'WHATEVER'
    }

    return jsonify(res)
