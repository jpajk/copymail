from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__, static_folder='static', static_url_path='')
socketio = SocketIO(app, async_mode='threading')

from app import views
