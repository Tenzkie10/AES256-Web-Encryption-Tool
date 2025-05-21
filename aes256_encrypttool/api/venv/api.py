from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import binascii
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Util import Counter

app = Flask(__name__)
CORS(app) # For CORS
# Getting the formats for encoding and decoding
def encode(data, fmt):
    if fmt == "base64":
        return base64.b64encode(data).decode()
    elif fmt == "hex":
        return binascii.hexlify(data).decode()
    return None

def decode(data, fmt):
    if fmt == "base64":
        return base64.b64decode(data)
    elif fmt == "hex":
        return binascii.unhexlify(data)
    return None

# Encryption methods
@app.route("/encrypt", methods=["POST"])
def encrypt():
    # Variables for data's from the users inputs
    try:
        data = request.get_json()
        key = decode(data["key"], "base64")
        mode = data["mode"]
        plaintext = data["message"].encode()
        output_format = data.get("format", "base64")
        iv_or_nonce = data.get("iv", "").encode()
               
        cipher = None
        result = {}
        
        # ECB Mode
        if mode == "ECB":
            padding = data.get("padding", "PKCS5Padding")
            if padding == "PKCS5Padding":
                plaintext = pad(plaintext, AES.block_size)
            cipher = AES.new(key, AES.MODE_ECB)
            ciphertext = cipher.encrypt(plaintext)
        
        # CBC Mode
        elif mode == "CBC":
            padding = data.get("padding", "PKCS5Padding")
            if padding == "PKCS5Padding":
                plaintext = pad(plaintext, AES.block_size)
            cipher = AES.new(key, AES.MODE_CBC, iv_or_nonce)
            ciphertext = iv_or_nonce + cipher.encrypt(pad(plaintext, AES.block_size))
            
        # CTR Mode
        elif mode == "CTR":
            if len(iv_or_nonce) != 16:
                return jsonify({"error": "Invalid nonce length. Nonce must be 16 bytes."}), 400
            ctr = Counter.new(128, initial_value=int.from_bytes(iv_or_nonce, byteorder='big'))
            cipher = AES.new(key, AES.MODE_CTR, counter=ctr)
            ciphertext = iv_or_nonce + cipher.encrypt(plaintext)
        
        # GCM Mode
        elif mode == "GCM":
            tag_len = data.get("tag_len", 128)
            if tag_len not in [96, 104, 112, 120, 128]:
                return jsonify({"error": "Invalid tag length. Tag length must be 128, 120, 112, 104, or 96 bits."}), 400
        
            cipher = AES.new(key, AES.MODE_GCM, nonce=iv_or_nonce, mac_len=tag_len // 8)
            ciphertext, tag = cipher.encrypt_and_digest(plaintext)
            result["ciphertext"] = encode(iv_or_nonce + ciphertext + tag, output_format)
            return jsonify(result)    
                
        result["ciphertext"] = encode(ciphertext, output_format)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400 # Error 

# Decryption methods        
@app.route("/decrypt", methods=["POST"])        
def decrypt():
    # Variables for data's from the users inputs
    try:
        data = request.get_json()
        key = decode(data["key"], "base64")
        ciphertext = decode(data["ciphertext"], data["format"])
        mode = data["mode"]
       
        if len(key) not in [16, 24, 32]:
            return jsonify({"error": "Invalid key length. Key must be 16, 24, or 32 bytes."}), 400
        
        # ECB Mode
        if mode == "ECB":
            cipher = AES.new(key, AES.MODE_ECB)
            plaintext = cipher.decrypt(ciphertext)
            padding = data.get("padding", "PKCS5Padding")
            if padding == "PKCS5Padding":
                plaintext = unpad(plaintext, AES.block_size)
        
        # CBC Mode                         
        elif mode == "CBC":
            iv = ciphertext[:AES.block_size]
            ciphertext = ciphertext[AES.block_size:]
            cipher = AES.new(key, AES.MODE_CBC, iv)
            plaintext = unpad(cipher.decrypt(ciphertext), AES.block_size)
        
        # CTR Mode
        elif mode == "CTR":
            iv = ciphertext[:16]
            ciphertext = ciphertext[16:]
            ctr = Counter.new(128, initial_value=int.from_bytes(iv, byteorder='big'))
            cipher = AES.new(key, AES.MODE_CTR, counter=ctr)
            plaintext = cipher.decrypt(ciphertext)
        
        # GCM Mode
        elif mode == "GCM":
            tag_len = data.get("tag_len", 128)
            if tag_len not in [96, 104, 112, 120, 128]:
                return jsonify({"error": "Invalid tag length. Tag length must be 96, 104, 112, 120, or 128 bits."}), 400

            iv = ciphertext[:16]
            tag = ciphertext[-(tag_len // 8):]
            ciphertext = ciphertext[16:-(tag_len // 8)]
            cipher = AES.new(key, AES.MODE_GCM, nonce=iv, mac_len=tag_len // 8)
            try:
                plaintext = cipher.decrypt_and_verify(ciphertext, tag)
            except ValueError:
                return jsonify({"error": "Invalid tag or corrupted ciphertext."}), 400
                                           
        return jsonify({"plaintext": plaintext.decode()})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400 # Error

if __name__ == "__main__":
    app.run(debug=True) # For testing
