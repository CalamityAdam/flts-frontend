import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../state';

const Form = styled.form`
  display: flex;
  justify-content: stretch;
  flex-direction: row;
  /* flex-wrap: nowrap; */
  /* margin: auto; */
`;
const FancyTextarea = styled.textarea`
  justify-self: stretch;
  font-family: 'Ubuntu', sans-serif;
  font-size: 3rem;
  /* flex-grow: 1; */
  padding: 0.5rem;
  margin: auto;
  /* height: fit-content; */
  margin-bottom: 1rem;
  box-shadow: 2px 2px 5px #273136;
  border: 1px solid #273136;
  border-radius: 5px;
  /* min-width: 0; */
  resize: none;
  /* word-wrap: normal; */
  /* overflow: hidden; */
  /* white-space: normal; */
  text-align: justify;
  -moz-text-align-last: center;
  text-align-last: center;
`;
const Nice = styled.h1`
  flex: 1;
  font-size: 4rem;
  margin: auto;
  margin-bottom: 1rem;
`;
const Instructions = styled.div`
  font-size: 2rem;
  flex: 1;
  margin: auto;
  margin-bottom: 1rem;
`;
const Container = styled.div`
  /* flex: 1; */
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
  width: 45vw;
  @media (max-width: 1300px) {
    width: 65vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: auto;
`;

function CopyToClipboard(){
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);
  const [{ newUrl }, dispatch] = useStateValue()
  const displayUrl = newUrl.split('//')[1];
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
        <Nice>NICE</Nice>
        <Instructions>copy and share!</Instructions>
        <Form>
          <FancyTextarea rows="1" ref={textAreaRef} value={displayUrl} readOnly />
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
    </Wrapper>
  );
};

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
`;
const I = styled.i`
  color: ${props => props.color};
  /* tyle={{width: '30px', height: '30px'}}  */
  font-size: 4rem;
  /* color: red; */
`;
const CopyButton = styled.button`
  flex: 1;
  font-family: 'Ubuntu';
  /* background-color: #59C8FF; */
  width: auto;
  font-size: 4rem;
  text-transform: uppercase;
  border: 2px solid #273136;
  box-shadow: 2px 2px 5px black;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  /* text-decoration: bold; */
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
`;
const Span = styled.span`
  color: black;
  margin-left: 1rem;
`;

export default CopyToClipboard;
