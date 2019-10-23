import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { FRONTEND_APP_URL } from '../lib/endpoints';
import { DeleteConfirm } from './index';
axios.defaults.withCredentials = true;

const shortFrontendUrl = FRONTEND_APP_URL.split('//')[1];

const CardWrapper = styled.div`
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
  /* text-align: left; */
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  color: black;
  /* margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem; */
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
  /* justify-content: space-between; */
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const A = styled.a`
  color: black;
  /* position: fixed; */
  justify-self: flex-start;
  margin-left: 1rem;
`;

function LinkCard({ shorten, handleDelete }) {
  const { slug, expiration, redirect, createdAt, id } = shorten;
  const [awaitConfirm, setAwaitConfirm] = useState(false);

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
  displayExpiration();
  
  function handleDeleteClick() {
    setAwaitConfirm(prev => !prev)
  }
  
  function confirm() {
    cancel()
    handleDelete(id)
  }
  function cancel() {
    setAwaitConfirm(false)
  }
  return (
    <CardWrapper>
      {awaitConfirm ? (
        <DeleteConfirm confirm={confirm} cancel={cancel} />
      ) : (
        <>
          <Group>
            <Title>name: </Title>
            <Name>{slug}</Name>
            <CopyButton>copy link</CopyButton>
          </Group>
          <Group2>
            <Title>short link: </Title>
            <A href={`${FRONTEND_APP_URL}/${slug}`}>
              {shortFrontendUrl}/<PrettySlug>{slug}</PrettySlug>
            </A>
          </Group2>
          <Group className="long-link">
            <Title>long link: </Title>
            <PrettyLongLink value={redirect} readOnly />
          </Group>
          <Group>
            <Title>expires: </Title>
            {displayExpiration()}
            <DeleteButton onClick={handleDeleteClick}>delete</DeleteButton>
          </Group>
        </>
      )}
    </CardWrapper>
  );
}

export default LinkCard;

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
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
`;
const DeleteButton = styled.button`
  text-transform: uppercase;
  font-size: 1.75rem;
  font-weight: 500;
  color: white;
  background: red;
  border: 2px solid red;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #273136;
  box-shadow: 2px 2px 5px #273136;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  }
  &:focus {
    outline: 0;
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
  /* width: 50%; */
`;
const CopyButton = styled.button`
  text-transform: uppercase;
  flex: 1;
  color: white;
  font-weight: 500;
  font-size: 1.75rem;
  background-color: #59c8ff;
  border: 2px solid #59c8ff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #273136;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  }
  &:focus {
    outline: 0;
  }
`;
