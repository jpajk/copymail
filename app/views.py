from app import app, socketio
from flask import render_template
from pprint import pprint
import magic


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def handle_message():
    print('Socket is connected')


@socketio.on('file_loaded')
def file_loaded(file):
    pprint(file)
    pprint(type(file['file']))
    pprint(magic.from_file(file))
