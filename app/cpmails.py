import imapclient
from .messages import Messages
from pprint import pprint


def cpimap(user1, host1, pass1, user2, host2, pass2):
    context = imapclient.create_default_context()
    messages = Messages()

    M1 = imapclient.IMAPClient(host=host1, use_uid=True, ssl=True,
                               ssl_context=context)

    M1.login(user1, pass1)

    M2 = imapclient.IMAPClient(host=host2, use_uid=True, ssl=True,
                               ssl_context=context)
    M2.login(user2, pass2)

    imap_folders = M1.xlist_folders()
    folders = []

    for folder in imap_folders:
        folders.append(folder[-1])

    messages.relayMessage(
        'initialize_progress',
        {
            'message': (host1, host2),
            'progress': (1, len(folders))
        }
    )

    print('folders: ')
    pprint(folders)

    for fi, f in enumerate(folders):
        if not M2.folder_exists(f):
            M2.create_folder(f)

        M1.select_folder(f)

        uids = M1.search(['NOT', 'DELETED'])

        print('Found ' + str(len(uids)) + ' messages')

        for mi, m in enumerate(uids):
            message = M1.fetch(m, 'RFC822')
            message_body = message[m][b'RFC822']
            M2.append(f, message_body)

            messages.relayMessage(
                'update_progress',
                {
                    'message': (fi + 1, len(folders)),
                    'progress': (mi + 1, len(uids) + 1)
                }
            )

    M1.logout()
    M2.logout()

    messages.relayMessage(
        'finish_progress',
        {
            'message': (host1, host2),
            'progress': (0, 0)
        }
    )

    # Handle end of the process
