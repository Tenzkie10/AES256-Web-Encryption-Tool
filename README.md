# AES256-Web-Encryption-Tool

The AES256 Web Encryption Tool is a simple and practical way to explore how AES (Advanced Encryption Standard) works. AES is a symmetric block cipher encryption algorithm that's widely used to securely encrypt and decrypt data.

This tool supports different AES modes ECB, CBC, CTR, and GCM each with specific settings like padding, initialization vectors (IV), tag lengths, and output formats (Base64 or Hex). It gives users the flexibility to try different encryption methods depending on their needs.

With an easy-to-follow setup guide and a clean interface, the app is great for learning, testing, or experimenting with AES encryption in a web environment. Whether you're just getting started or looking to understand how encryption works behind the scenes, this tool provides a straightforward and hands-on experience.

## Cloning the Web-App
1. Open VSCode
2. Open a specific folder to save
3. Open Terminal or ctrl + shift + `
4. Copy this and run - git clone https://github.com/Tenzkie10/AES256-Web-Encryption-Tool.git
5. Make sure to cd ~/aes256_encrypttool/ folder
   
## Tutorial for running the Web-App
1. Open your terminal in VSCode
   
2. Make sure to run this command to verify library
![image](https://github.com/user-attachments/assets/829e47f2-93ac-401f-a243-6ada1cd54cdb)

3. To run the web-app - npm run dev
   
![image](https://github.com/user-attachments/assets/1644be43-c2b9-4174-bbeb-9fa33609a878)

Ctrl + Click the http://localhost:5173/ to run the web-app to your browser

4. To run the backend, open another terminal then go to this location

![image](https://github.com/user-attachments/assets/d5676a8b-6083-4026-a696-af667b4e7ee1)

5.  Run this command - python api.py

![image](https://github.com/user-attachments/assets/b04dd2f0-77f2-420a-9505-7876d541cc85)

## User Interface
### Encrypt and Decrypt UI
**ECB**
![image](https://github.com/user-attachments/assets/36af433f-889d-4111-8158-6a11d5c4f7dc)

**CBC**
![image](https://github.com/user-attachments/assets/7ef4db8e-e8a8-4736-8ab1-8c74bd2f9ad9)

**CTR**
![image](https://github.com/user-attachments/assets/90affe7c-4fd3-40c7-b8bd-b9e9e94365e0)

**GCM**
![image](https://github.com/user-attachments/assets/b6a1b0be-2aed-473b-8d3f-cd8e7409a2d3)


### Descriptions
![image](https://github.com/user-attachments/assets/5e3624b4-13d3-40e9-8199-143c8521e6ef)

## How to use different modes of encryption
### Encryption
### ECB
**The ECB requires a padding, secret key and a output of base64 or hex format**
- PKCS5Padding
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### CBC
**The CBC requires a padding, initialization vector, secret key and a output of base64 or hex format**
- PKCS5Padding
- Initialization Vector can be 16 characters
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### CTR
**The CTR requires an initialization vector, secret key and a output of base64 or hex format**
- Initialization Vector can be 16 characters
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### GCM
**The GCM requires an initialization vector, authentication tag length, secret key and a output of base64 or hex format**
- Initialization Vector can be 16 characters
- Authentication tag length can be 96, 104, 112, 120, or 128
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
##
### Decryption

### ECB
**The ECB requires a padding, secret key and a output of base64 or hex format**
- PKCS5Padding
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### CBC
**The CBC requires a padding, secret key and a output of base64 or hex format**
- PKCS5Padding
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### CTR
**The CTR requires a secret key and a output of base64 or hex format**
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
### GCM
**The GCM requires an authentication tag length, secret key and a output of base64 or hex format**
- Authentication tag length can be 96, 104, 112, 120, or 128
- Secret Key can be 16, 24, or 32 characters
- Base64 or Hex Output
  
## Conclusion
The AES256 Web Encryption Tool makes it easy to explore and use AES encryption right from your browser. With support for multiple modes like ECB, CBC, CTR, and GCM, users can try out different encryption setups by adjusting settings like padding, IVs, and output formats (Base64 or Hex).

The app is simple to run with a clear step-by-step guide for launching both the frontend and backend. It’s a useful tool for learning how AES works, testing encryption setups, or just getting more familiar with secure data handling. Overall, it’s a practical and hands-on way to work with AES encryption in a modern web environment.
