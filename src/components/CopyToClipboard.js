import React, { useState, useRef } from 'react';

const CopyToClipboard = ({ newUrl, ...rest }) => {
  
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  
  /**
   * execute copy to clipboard
   */
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(true);
  }
  
  return (
    <div>
      <h1>
        NICE!
      </h1>
      <form>
        <textarea ref={textAreaRef} value={newUrl} readOnly />
        {document.queryCommandSupported('copy') && (
          <button 
            className="nice-button" 
            onClick={copyToClipboard} 
            disabled={copySuccess}
          >
            {copySuccess ? 'Copied!' : 'Copy to clipboard'}
          </button>
        )}
      </form>
    </div>
  )
}

export default CopyToClipboard;
