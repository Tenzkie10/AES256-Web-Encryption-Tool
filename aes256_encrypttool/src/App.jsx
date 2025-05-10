import React, { useState } from 'react';
import './App.css';

function App() {
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const [outputFormat, setOutputFormat] = useState('base64');

  const isEncryption = mode === 'encrypt';

  return (
    <div className='app-container'>
      <header className='app-header'>
        <div className='logo-container'>
          <h3>Logo</h3>
        </div>
        <h1>Web App Name</h1>
      </header>

      <main className='main-content'>
        {/* Left Panel */}
        <div className='input-container'>
          <h2>{isEncryption ? 'Plain Text' : 'Cipher Text'}</h2>
          <textarea
            className='input-text-box'
            placeholder={isEncryption ? 'Enter plain text' : 'Enter cipher text'}
          />
        </div>

        {/* Middle Panel */}
        <div className='config-container'>
          {/* Toggle Buttons */}
          <div className='type-container'>
            <button
              type='button'
              className={`encrypt-button ${isEncryption ? 'active' : ''}`}
              onClick={() => setMode('encrypt')}
            >
              Encryption
            </button>
            <button
              type='button'
              className={`decrypt-button ${!isEncryption ? 'active' : ''}`}
              onClick={() => setMode('decrypt')}
            >
              Decryption
            </button>
          </div>

          <label>Modes</label>
          <select id='modes' name='modes' className='mode-select'>
            <option value='ECB'>ECB</option>
            <option value='CBC'>CBC</option>
            <option value='CTR'>CTR</option>
            <option value='GCM'>GCM</option>
          </select>

          <label>Padding</label>
          <select id='padding' name='padding' className='padding-select'>
            <option value='noPadding'>noPadding</option>
            <option value='PKCS5Padding'>PKCS5Padding</option>
          </select>

          <label>IV</label>
          <input
            type='text'
            className='iv-input'
            placeholder='Enter Initialization Vector.'
          />

          <label>Secret Key</label>
          <input
            type='text'
            className='sk-input'
            placeholder='Enter Secret Key.'
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
            {isEncryption ? (
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
            ) : (
              <label>
                <input
                  type='radio'
                  name='otf-option'
                  value='plain'
                  checked={outputFormat === 'plain'}
                  onChange={(e) => setOutputFormat(e.target.value)}
                />
                Plain Text
              </label>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className='output-container'>
          <h2>{isEncryption ? 'Cipher Text' : 'Plain Text'}</h2>
          <textarea
            className='output-text-box'
            placeholder={isEncryption ? 'Cipher output' : 'Decrypted plain text'}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
