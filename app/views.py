from app import app, socketio
from flask import render_template
from .cpmails import cpimap
from .messages import Messages
from pprint import pprint
import csv


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


@socketio.on('connect')
def handle_message():
    print('Socket is connected')


@socketio.on('file_loaded')
def file_loaded(file):
    file_byte = file['file']
    file_string = str(file_byte, 'utf-8')

    reader = csv.reader(file_string.split('\n'), delimiter=',', quotechar='"')

    for row in reader:
        if len(row) != 6:
            print('Row length not correct, skipping')
            continue

        connection_data = []

        for field in row:
            connection_data.append(field.strip())

        user1, host1, pass1, user2, host2, pass2 = connection_data

        try:
            cpimap(user1, host1, pass1, user2, host2, pass2)
        except Exception as e:
            Messages().relayError(
                'server_error',
                {
                    'message': str(e)
                }
            )
