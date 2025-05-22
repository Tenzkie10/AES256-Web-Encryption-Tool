import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { ChevronsDown } from 'lucide-react';
import aes256_logo from './assets/aes256_logo.png';

function App() {
  const [process, setProcess] = useState('encrypt'); // for processes: 'encrypt' or 'decrypt' (encrypt as default)
  const [mode, setMode] = useState('ECB'); // for modes: 'ECB', 'CBC', 'CTR', or 'GCM' (ECB as default)
  const [outputFormat, setOutputFormat] = useState('base64');
  const [skChar, setSKChar] = useState('16') // for secret key character options
  const [inputText, setInputText] = useState(''); // for input text
  const [outputText, setOutputText] = useState(''); // for output text
  const [secretKey, setSecretKey] = useState(''); // for secret key
  const handleSKCharChange = (value) => {
    setSKChar(value);
  // If the secretKey is longer than the new length, trim it
    if (secretKey.length > Number(value)) {
      setSecretKey(secretKey.slice(0, Number(value)));
    }
  };
  const [padding, setPadding] = useState('noPadding'); // for padding (noPadding as default)
  const [iv, setIv] = useState(''); // for Initialization Vector (IV)
  const isEncryption = process === 'encrypt';
  const isECB = mode === 'ECB';
  const isCBC = mode === 'CBC';
  const isCTR = mode === 'CTR';
  const isGCM = mode === 'GCM';

  // For Secret Key
  const generateRandomKey = () => {
    const length = Number(skChar)
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++){
      key += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setSecretKey(key)
  };

  // For IV
  const generateRandomKeyIV = () => {
    const length = 16
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ivValue = '';
    for (let i = 0; i < length; i++){
      ivValue += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setIv(ivValue)
  };

  const handleProcess = async () => {
    try {

      if (!inputText.trim()) {
        alert('Please enter the text to encrypt or decrypt.');
        return;
      }
      if (!secretKey.trim()) {
        alert('Please enter the secret key.');
        return;
      }

      const url = process === 'encrypt' ? '/encrypt' : '/decrypt';
      const payload = {
        key: btoa(secretKey), // Encode the key in base64
        ciphertext: inputText,
        mode,
        message: inputText,
        format: outputFormat,
        ...(mode === 'ECB' && { padding }),
        ...(mode === 'CBC' && { iv }),
        ...(mode === 'CTR' && { iv }),
        ...(mode === 'GCM' && { iv }),
        ...(mode === 'GCM' && { iv, tag_len: parseInt(document.getElementById('tagLen').value) }),
      };

      const response = await axios.post(`http://127.0.0.1:5000${url}`, payload);
      if (process === 'encrypt') {
        setOutputText(response.data.ciphertext);
      } else {
        setOutputText(response.data.plaintext);
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      alert('An error occurred: ' + (error.response?.data?.error || error.message));
    }
  };



  return (
    <div className='app-container'>
      <header className='app-header'>
        <img src={aes256_logo} alt="Logo" className="logo-image"></img>
        <h1>AES256 Encryption Tool</h1>
      </header>

      <main className='main-content'>
        {/* here is Left Panel */}
        <div className='input-container'>
          <h2>{isEncryption ? 'Plain Text' : 'Cipher Text'}</h2>
          <textarea
            className='input-text-box'
            placeholder={isEncryption ? 'Enter plain text' : 'Enter cipher text'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* here is Middle Panel */}
        <div className='config-container'>
          {/* for Processes */}
          <div className='type-container'>
            <button
              type='button'
              className={`encrypt-button ${isEncryption ? 'active' : ''}`}
              onClick={() => setProcess('encrypt')}
            >
              Encryption
            </button>
            <button
              type='button'
              className={`decrypt-button ${!isEncryption ? 'active' : ''}`}
              onClick={() => setProcess('decrypt')}
            >
              Decryption
            </button>
          </div>

          {/* for Mode selection */}
          <label>Modes</label>
          <select
            id='modes'
            name='modes'
            className='mode-select'
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value='ECB'>ECB</option>
            <option value='CBC'>CBC</option>
            <option value='CTR'>CTR</option>
            <option value='GCM'>GCM</option>
          </select>

          {/* for Mode conditions */}
          {(isECB || isCBC) && (
            <>
              <label>Padding</label>
              <select id='padding' name='padding' className='padding-select' value={padding} onChange={(e) => setPadding(e.target.value)}>
                <option value='noPadding'>noPadding</option>
                <option value='PKCS5Padding'>PKCS5Padding</option>
              </select>
            </>
          )}

          {(isCBC || isCTR || isGCM) && (
            <>
              <label>IV</label>
              <div className='iv-generate-container'>
                <button type='button' className='iv-generate' onClick={generateRandomKeyIV}>Generate IV</button>
              </div>
              <input
                type='text'
                maxLength={16}
                className='iv-input'
                placeholder='Enter Initialization Vector. (16 characters)'
                value={iv}
                onChange={(e) => setIv(e.target.value)}
              />
            </>
          )}

          {isGCM && (
            <>
              <label>Authentication Tag Length</label>
              <select id='tagLen' name='tagLen' className='taglen-select'>
                <option value='96'>96</option>
                <option value='104'>104</option>
                <option value='112'>112</option>
                <option value='120'>120</option>
                <option value='128'>128</option>
              </select>
            </>
          )}

          {/* seperated from the condition because its in every Mode */}
          <label>Secret Key</label>
          <div className='sk-char-option-container'>
            <label>
              <input
                type='radio'
                name='sk-char-option'
                value='16'
                checked={skChar === '16'}
                onChange={(e) => handleSKCharChange(e.target.value)}
              />
              16
            </label>
            <label>
              <input
                type='radio'
                name='sk-char-option'
                value='24'
                checked={skChar === '24'}
                onChange={(e) => handleSKCharChange(e.target.value)}
              />
              24
            </label>
            <label>
              <input
                type='radio'
                name='sk-char-option'
                value='32'
                checked={skChar === '32'}
                onChange={(e) => handleSKCharChange(e.target.value)}
              />
              32
            </label>
            <button type='button' className='skChar-generate' onClick={generateRandomKey}>Generate SK</button>
          </div>
          
          <input 
          type='text'
          maxLength={Number(skChar)}
          className='sk-input'
          placeholder='Enter Secret Key. (16, 24, or 32 characters)'
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          />

          <label>Output Text Format</label>
          <div className='otf-container'>
            <label>
              <input
                type='radio'
                name='otf-option'
                value='base64'
                checked={outputFormat === 'base64'}
                onChange={(e) => setOutputFormat(e.target.value)}
              />
              Base64
            </label>
            <label>
              <input
                type='radio'
                name='otf-option'
                value='hex'
                checked={outputFormat === 'hex'}
                onChange={(e) => setOutputFormat(e.target.value)}
              />
              HEX
            </label>
          </div>

          <div className='enter-container'>
            <button type='button' className='enter-button' onClick={handleProcess}>
              {isEncryption ? 'Encrypt' : 'Decrypt'}
            </button>
          </div>
        </div>

        {/* for Right Panel */}
        <div className='output-container'>
          <h2>{isEncryption ? 'Cipher Text' : 'Plain Text'}</h2>
          <textarea
            className='output-text-box'
            placeholder={isEncryption ? 'Cipher output' : 'Decrypted plain text'}
            value={outputText}
            readOnly
          />
        </div>
      </main>
      {/* for the More Information */}
      <div className='more-info-container'>
        <h2>More Information Here</h2>
        <a href='#infos'><ChevronsDown /></a>
      </div>
      <footer id='infos' className='app-footer'>
          <div className='footer-label'>
            <h2>AES256 (Advanced Encryption Standard with 256-bit key)</h2>
            <p className='aes256-desc'>
              - AES 256, or the Advanced Encryption Standard with a 256-bit key, is a symmetric encryption algorithm that uses a 256-bit key to encrypt and decrypt data.<br></br> 
              - It's considered a very strong encryption method, used for protecting sensitive information like classified data. 
            </p>
          </div>
          <div className='terms-container'>
            <div className='modes-label'>
              <h2>Modes:</h2>
              <h3>ECB (Electronic Codebook)</h3>
              <p className='ecb-desc'>
                - The simplest mode, where each block of plaintext is encrypted independently using the same key.<br></br><br></br>
              </p>
              <h3>CBC (Cipher Block Chaining)</h3>
              <p className='cbc-desc'>
                - This chaining prevents identical plaintext blocks from producing identical ciphertext blocks, improving security.<br></br>
                - Requires an Initialization Vector (IV) to ensure different encryption for each message.<br></br><br></br>
              </p>
              <h3>CTR (Counter)</h3>
              <p className='ctr-desc'>
                - Converts AES into a stream cipher, allowing for encryption of smaller data units.<br></br><br></br>
              </p>
              <h3>GCM (Galois/Counter Mode)</h3>
              <p className='gcm-desc'>
                - Combines Counter mode for encryption with a Galois mode for authentication.<br></br>
                - Provides both confidentiality (through encryption) and authenticity (through a MAC or authentication tag).
              </p>
            </div>
            <div className='other-configs-label'>
              <h2>PKCS5Padding</h2>
              <p className='padding-desc'>
                - PKCS5Padding adds padding bytes to the end of the input data until the total length becomes a multiple of the block size.
              </p>
              <h2>Initialization Vector (IV)</h2>
              <p className='iv-desc'>
                - This ensures that even with the same key, each encryption will produce a unique ciphertext. 
              </p>
              <h2>Authentication Tag</h2>
              <p className='tag-len-desc'>
                - A value appended to the ciphertext to ensure that the ciphertext has not been tampered with and that the recipient is the intended recipient. 
              </p>
              <h2>Secret Key</h2>
              <p className='sk-desc'>
                - Used in conjunction with the AES algorithm to scramble the plaintext (original data) into ciphertext (encrypted data) and then to unscramble the ciphertext back into the original plaintext. 
              </p>
            </div>
            <div className='output-text-format-label'>
              <h2>Output Text Formats:</h2>
              <h3>Base64</h3>
              <p className='base64-desc'>
                - Encodes binary data into a limited set of 64 printable characters
              </p>
              <h3>HEX</h3>
              <p className='hex-desc'>
                - Uses a combination of 16 digits (0-9), A-F) to represent binary data.
              </p>
            </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
