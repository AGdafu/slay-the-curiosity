"""Game server — serves Slay the Curiosity on port 8766, any host."""
import http.server
import os
import sys

PORT = 9876
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        # Redirect / to /game.html
        if self.path == '/' or self.path == '/index.html':
            self.path = '/game.html'
        super().do_GET()

    def log_message(self, format, *args):
        print(f"[{self.client_address[0]}] {args[0]}")

if __name__ == '__main__':
    print(f"Serving {DIR} on http://0.0.0.0:{PORT}")
    httpd = http.server.HTTPServer(('0.0.0.0', PORT), Handler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()
