import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../state';

function CopyToClipboard(){
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  const [{ newUrl }, dispatch] = useStateValue()
  const displayUrl = newUrl.split('//')[1];
  const width = (Math.ceil(displayUrl.length / 10) * 16) 
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
  
  function clearUrl() {
    dispatch({
      type: 'setNewUrl',
      newUrl: '',
    })
  }
  
  return (
    <Wrapper>
      <Container>
        <Nice>NICE!</Nice>
        <Instructions>copy and share!</Instructions>
        <Form>
          <FancyTextarea rows="1" width={width} value={displayUrl} readOnly />
        </Form>
        {document.queryCommandSupported('copy') && (
          <CopyButton onClick={copyToClipboard} disabled={copySuccess}>
            {copySuccess ? (
              'Copied!'
            ) : (
              <I className="far fa-copy" color="green">
                <Span>copy</Span>
              </I>
            )}
          </CopyButton>
        )}
      </Container>
      <MakeMore onClick={clearUrl}>make more!</MakeMore>
      <textarea 
        ref={textAreaRef}
        style={{height: 0, width: 0, opacity: 0}}
        value={newUrl}
        readOnly
      />
    </Wrapper>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: stretch;
  flex-direction: row;
`;
const FancyTextarea = styled.textarea`
  justify-self: stretch;
  font-family: 'Ubuntu', sans-serif;
  font-size: 3rem;
  padding: 0.5rem;
  margin: auto;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 5px #273136;
  border: 1px solid #273136;
  border-radius: 5px;
  width: ${props => `${props.width}rem`};
  overflow-y: auto;
  resize: none;
  text-align: justify;
  -moz-text-align-last: center;
  text-align-last: center;
  @media (max-width: 700px) {
    font-size: 2rem;
    width: 100vw;
    margin: .5rem;
    padding: 0 .5rem 0 .5rem;
  }
`;
const Nice = styled.h1`
  flex: 1;
  font-size: 4rem;
  margin: auto;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: 2.5rem;
    margin: 1rem;
  }
`;
const Instructions = styled.div`
  font-size: 2rem;
  flex: 1;
  margin: auto;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: 1.5rem;
    margin: 0;
  }
`;
const Container = styled.div`
  border: 2px solid whitesmoke;
  background-color: white;
  border-radius: 10px;
  margin-top: 4rem;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 6px 6px 20px #273136, -6px -6px 20px #273136,
    -6px 6px 20px #273136, 6px -6px 20px #273136;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 1300px) {
  }
  @media (max-width: 700px) {
    width: 100vw;
    margin: 0;
    margin-top: 1rem;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  @media (max-width: 700px) {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
`;
const MakeMore = styled.button`
  font-size: 2rem;
  font-family: 'Ubuntu';
  text-transform: uppercase;
  border: 2px solid #273136;
  box-shadow: 2px 2px 5px black;
  border-radius: 5px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    margin: 1rem;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    font-size: 2rem;
  }
`;
const I = styled.i`
  color: ${props => props.color};
  font-size: 4rem;
  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;
const CopyButton = styled.button`
  flex: 1;
  font-family: 'Ubuntu';
  width: auto;
  font-size: 4rem;
  text-transform: uppercase;
  border: 2px solid #273136;
  box-shadow: 2px 2px 5px black;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    color:  black;
    font-size: 2rem;
    margin-top: .5rem;
    background-color: white;
  }
`;
const Span = styled.span`
  color: black;
  margin-left: 1rem;
`;

export default CopyToClipboard;
