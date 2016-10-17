from app import socketio
from pprint import pprint


class Messages():
    def __init__(self):
        self.messages = {
            'initialize_progress': {
                'currentMessage': (
                    lambda *x: "Copying messages from %s to %s" % x
                )
            },
            'update_progress': {
                'currentMessage': (
                    lambda *x: "Copying contents of the box %s of %s" % x
                )
            },
            'finish_progress': {
                'currentMessage': (
                    lambda *x: "Finished copying from %s to %s" % x
                )
            }
        }

        self.errorMessages = {
            'server_error': {
                'currentMessage': (lambda *x: "Server error: %s" % x)
            }
        }

    def relayMessage(self, key, args):
        msg = self.messages[key]
        self.__relayServerMessage(msg, key, args)

    def relayError(self, key, args):
        msg = self.errorMessages[key]
        self.__relayServerMessage(msg, key, args)

    def __calculateProgress(self, *args):
        current, total = args
        return round(current + 1 / total + 1, 2) * 100

    def __relayServerMessage(self, msg, key, args):
        socketio.emit(
            key, {
                'data': {
                    'currentMessage': msg['currentMessage'](*args['message']),
                    'progress': (
                        0 if key is 'server_error'
                        else self.__calculateProgress(*args['progress'])
                    )
                }
            }
        )
