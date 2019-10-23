import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FancyButton from './styles/FancyButton';


const FancyTextarea = styled.textarea`
  width: 50%;
  height: 4rem;
  font-size: 3rem;
  resize: none;
  box-sizing: border-box;
  border-radius: 5px;
  white-space: pre;
  word-wrap: normal;
  overflow: hidden;
  white-space: normal;
  text-align: justify;
  -moz-text-align-last: center; 
  text-align-last: center;
  @media (max-width: 1300px) {
    width: 75%;
  }
`;

/* textarea {
  width: 100%;
  height: auto;
  font-size: 3em;
  resize: none;
  box-sizing: border-box;
  border-radius: 5px;
  white-space: pre;
  word-wrap: normal;
  overflow: hidden;
  
  white-space: normal;
  text-align: justify;
  -moz-text-align-last: center; 
  text-align-last: center;
} */

const CopyToClipboard = ({ newUrl, ...rest }) => {
  
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  const displayUrl = newUrl.split('//')[1]
  /**
   * execute copy to clipboard
   */
  function copyToClipboard(e) {
    // TODO: change the copied text from the displayUrl to the newUrl
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
        <FancyTextarea ref={textAreaRef} value={displayUrl} readOnly />
        <br />
        {document.queryCommandSupported('copy') && (
          <FancyButton
            onClick={copyToClipboard} 
            disabled={copySuccess}
          >
            {copySuccess ? 'Copied!' : 'Copy to clipboard'}
          </FancyButton>
        )}
      </form>
    </div>
  )
}
export default CopyToClipboard;
