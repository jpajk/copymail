from app import app, socketio
from flask import render_template
from .cpmails import cpimap
import csv


@app.route('/')
def index():
    return render_template('index.html')


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

        cpimap(user1=row[0], host1=row[1], pass1=row[2],
               user2=row[3], host2=row[4], pass2=row[5])
