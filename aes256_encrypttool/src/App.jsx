import React, { useState } from 'react';
import './App.css';

function App() {
  const [process, setProcess] = useState('encrypt'); // for processes: 'encrypt' or 'decrypt' (encrypt as default)
  const [mode, setMode] = useState('ECB'); // for modes: 'ECB', 'CBC', 'CTR', or 'GCM' (ECB as default)
  const [outputFormat, setOutputFormat] = useState('base64');

  const isEncryption = process === 'encrypt';
  const isECB = mode === 'ECB';
  const isCBC = mode === 'CBC';
  const isCTR = mode === 'CTR';
  const isGCM = mode === 'GCM';

  return (
    <div className='app-container'>
      <header className='app-header'>
        <div className='logo-container'>
          <h3>Logo</h3>
        </div>
        <h1>Web App Name</h1>
      </header>

      <main className='main-content'>
        {/* here is Left Panel */}
        <div className='input-container'>
          <h2>{isEncryption ? 'Plain Text' : 'Cipher Text'}</h2>
          <textarea
            className='input-text-box'
            placeholder={isEncryption ? 'Enter plain text' : 'Enter cipher text'}
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
              <select id='padding' name='padding' className='padding-select'>
                <option value='noPadding'>noPadding</option>
                <option value='PKCS5Padding'>PKCS5Padding</option>
              </select>
            </>
          )}

          {(isCBC || isCTR || isGCM) && (
            <>
              <label>IV</label>
              <input
                type='text'
                className='iv-input'
                placeholder='Enter Initialization Vector.'
              />
            </>
          )}

          {isGCM && (
            <>
              <label>Tag Length</label>
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
            <button type='button' className='enter-button'>
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
          />
        </div>
      </main>
    </div>
  );
}

export default App;
