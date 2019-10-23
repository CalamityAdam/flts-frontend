import React, { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { FRONTEND_APP_URL } from '../lib/endpoints';
import { DeleteConfirm } from './index';
import copy from '../images/copy-regular.svg'
import trash from '../images/trash-solid.svg'
axios.defaults.withCredentials = true;

const shortFrontendUrl = FRONTEND_APP_URL.split('//')[1];

function LinkCard({ shorten, handleDelete }) {
  const { slug, expiration, redirect, createdAt, id } = shorten;
  const [awaitConfirm, setAwaitConfirm] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false)
  const textAreaRef = useRef(null);

  function displayExpiration() {
    if (expiration === 0) {
      // permanent
      return 'never';
    }
    const timeLeftInMinutes = differenceInMinutes(
      Number(new Date(createdAt)) + expiration,
      Date.now(),
    );
    if (timeLeftInMinutes < 60) {
      // less than 1 hour remaining
      return `${timeLeftInMinutes} minutes`;
    }
    // more than 1 hour remaining
    const timeLeftInHours = differenceInHours(
      Number(new Date(createdAt)) + expiration,
      Date.now(),
    );
    return `${timeLeftInHours} hour${timeLeftInHours > 1 ? 's' : ''}`;
  }
  
  function confirm() {
    cancel();
    handleDelete(id);
  }
  function cancel() {
    setAwaitConfirm(false);
  }
  
  function copyToClipboard(e) {
    // TODO: change the copied text from the displayUrl to the newUrl
    textAreaRef.current.select();
    console.log(textAreaRef.current)
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }
  return (
    <CardWrapper>
      {awaitConfirm ? (
        <DeleteConfirm confirm={confirm} cancel={cancel} />
      ) : (
        <>
          <Group3>
            <Title>name: </Title>
            <Name>{slug}</Name>
            {document.queryCommandSupported('copy') && (
              <CopySuccess show={copySuccess}>
                copied to clipboard!
              </CopySuccess>
            )}
          </Group3>
          <Group2>
            <Title>short link: </Title>
            <A href={`${FRONTEND_APP_URL}/${slug}`}>
              {shortFrontendUrl}/<PrettySlug>{slug}</PrettySlug>
            </A>
            {document.queryCommandSupported('copy') && (
              <CopyButton onClick={copyToClipboard}>
                <img src={copy} alt="copy link" width="30" height="30" />
              </CopyButton>
            )}
          </Group2>
          <Group className="long-link">
            <Title>long link: </Title>
            <PrettyLongLink value={redirect} readOnly />
          </Group>
          <Group3>
            <Title>expires: </Title>
            {displayExpiration()}
            <DeleteButton onClick={() => setAwaitConfirm(true)}>
              <img src={trash} alt="delete" style={{width: '30px', height: '30px'}} />
            </DeleteButton>
          </Group3>
          <textarea 
            ref={textAreaRef}
            style={{height: 0, width: 0, opacity: 0}}
            value={`${FRONTEND_APP_URL}/${slug}`}
            readOnly
          />
        </>
      )}
    </CardWrapper>
  );
}

export default LinkCard;

const fadeIn = keyframes`
  0%, 100% {
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
`;
const CopySuccess = styled.div`
  box-sizing: border-box;
  border: 2px solid green;
  border-radius: 5px
  /* visibility: hidden; */
  margin-left: auto;
  opacity: 0;
  ${props => props.show && css`
    animation: 3s ${fadeIn} ease-out;
  `}
`;

const CardWrapper = styled.div`
  /* overflow: hidden; */
  flex: 1;
  height: 220px;
  width: 650px;
  max-width: 650px;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  font-family: 'ubuntu';
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  color: black;
  box-shadow: 6px 6px 20px #273136, -6px -6px 20px #273136, -6px 6px 20px #273136, 6px -6px 20px #273136;
`;
const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;
const Group2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: .5rem;
  margin-top: 0.5rem;
`;
const Group3 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const A = styled.a`
  color: black;
  justify-self: flex-start;
  margin-left: 1rem;
  margin-right: 1rem;
`;
const Title = styled.span`
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff7381;
  word-wrap: unset;
  white-space: nowrap;
  line-height: 2.5rem;
`;

const Name = styled.span`
  /* flex: 1; */
  font-weight: bold;
  font-size: 2rem;
`;
const DeleteButton = styled.button`
  color: white;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  margin-left: 1rem;
  box-shadow: 2px 2px 5px #273136;
  box-shadow: 2px 2px 5px #273136;
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
const PrettySlug = styled.span`
  font-size: 2rem;
  color: #ff7381;
  font-weight: bold;
  text-decoration: none;
`;
const PrettyLongLink = styled.textarea`
  align-self: stretch;
  font-size: 1.5rem;
  white-space: nowrap;
  height: 2rem;
  resize: none;
  color: black;
  width: 100%;
`;
const CopyButton = styled.button`
  /* text-transform: uppercase; */
  /* flex: 1; */
  width: auto;
  color: #59c8ff;
  /* font-weight: 500; */
  /* font-size: 1.75rem; */
  background-color: white;
  border: 3px solid black;
  padding-top: 2px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #273136;
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
