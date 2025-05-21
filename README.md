# AES256-Web-Encryption-Tool

Advanced Encryption Standard (AES) is a symmetric  block cipher encryption algorithm.

## Tutorial for running the Web-App
1. Open your terminal in VSCode
   
2. Make sure to run this command to verify library
![image](https://github.com/user-attachments/assets/829e47f2-93ac-401f-a243-6ada1cd54cdb)

3. To run the web-app: npm run dev
   
![image](https://github.com/user-attachments/assets/1644be43-c2b9-4174-bbeb-9fa33609a878)

Ctrl + Click the http://localhost:5173/ to run the web-app to your browser

4. To run the backend, open another terminal then got to this location

![image](https://github.com/user-attachments/assets/d5676a8b-6083-4026-a696-af667b4e7ee1)

5.  Run this command

![image](https://github.com/user-attachments/assets/b04dd2f0-77f2-420a-9505-7876d541cc85)

## User Interface
![image](https://github.com/user-attachments/assets/dfee7104-0a7b-477b-889f-a796040c0406)
![image](https://github.com/user-attachments/assets/5e3624b4-13d3-40e9-8199-143c8521e6ef)

## How to use different modes of encryption
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

## Conclusion
