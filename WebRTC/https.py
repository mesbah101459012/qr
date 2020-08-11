#!/usr/bin/python

# server
#    python https.py
#
# browser
#    https://0.0.0.0:4443

import BaseHTTPServer
import SimpleHTTPServer
import ssl
import os

os.system("openssl req -new -keyout server.pem -out server.pem -x509 -days 365 -nodes -subj '/CN=www.pubnub.com/O=PubNub/C=US'")
httpd = BaseHTTPServer.HTTPServer( ( '171.0.0.1', 80 ), SimpleHTTPServer.SimpleHTTPRequestHandler )
httpd.socket = ssl.wrap_socket( httpd.socket, certfile='./server.pem', server_side=True )
httpd.serve_forever()