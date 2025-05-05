from flask import Flask

app = Flask(__name__)

@app.route('/api/route')
def aes_ecb_encrypt():
    return 0
