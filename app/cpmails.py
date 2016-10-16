import imapclient
import sys
from .messages import Messages


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
            'process': (1, len(folders))
        }
    )

    return 1

    for f in folders:
        print('Copying ' + f)

        if not M2.folder_exists(f):
            M2.create_folder(f)

        M1.select_folder(f)

        print('Fetching messages...')

        uids = M1.search(['NOT', 'DELETED'])

        print('Found ' + str(len(uids)) + ' messages')

        for m in uids:
            message = M1.fetch(m, 'RFC822')
            sys.stdout.write('.')
            sys.stdout.flush()
            message_body = message[m][b'RFC822']
            M2.append(f, message_body)

        sys.stdout.write("\n")

    M1.logout()
    M2.logout()

    print("Done copying")
