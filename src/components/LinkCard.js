import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { FRONTEND_APP_URL } from '../lib/endpoints'
axios.defaults.withCredentials = true;

const shortFrontendUrl = FRONTEND_APP_URL.split('//')[1];

const CardWrapper = styled.div`
  font-family: 'ubuntu';
  font-size: 2rem;
  /* padding: 1rem 0 1rem; */
  margin: 2rem 0 1.5rem;
  text-align: left;
  word-wrap: break-word;
  &:after {
    content: '';
    height: 2px;
    /* width: calc(50% - 25rem); */
    width: 45%;
    background-color: white;
    transform: translateX(-50%);
    left: 50%;
    margin-top: .75rem;
    position: absolute;
  }
`;
const Title = styled.span`
  margin-top: .5rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: .5rem;
  color: #FF7381;
`;
const Group = styled.div`
  display: block;
  margin-bottom: .5rem;
  a {
    color: white;
  }
`;
const Name = styled.span`
  font-weight: bold;
  font-size: 2.5rem;
`;
const DeleteButton = styled.button`
  font-size: 1.75rem;
  font-weight: 500;
  color: white;
  background: red;
  border: 2px solid red;
  border-radius: 10px;
  margin-left: 2rem;
  position: relative;
`;
const PrettySlug = styled.span`
  font-size: 2.5rem;
  color: #FF7381;
  font-weight: bold;
  text-decoration: none;
`;
const PrettyLongLink = styled.textarea`
  font-size: 1.25rem;
  white-space: nowrap;
  height: 1.75rem;
  resize: none;
  width: 50%;
`;
const CopyButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 1.75rem;
  background-color: #59C8FF;
  border: 2px solid #59C8FF;
  border-radius: 10px;
  margin-left: 2rem;
  position: relative;
`;

function LinkCard({ shorten, handleDelete }) {
  const { slug, expiration, redirect, createdAt, id } = shorten;
  
  function displayExpiration() {
    if (expiration === 0) {
      // permanent
      return 'never'
    }
    const timeLeftInMinutes = differenceInMinutes(
      (Number(new Date(createdAt)) + expiration), Date.now()
    );
    if (timeLeftInMinutes < 60) {
      // less than 1 hour remaining
      return `${timeLeftInMinutes} minutes`
    }
    // more than 1 hour remaining
    const timeLeftInHours = differenceInHours(
      (Number(new Date(createdAt)) + expiration), Date.now()
    );
    return `${timeLeftInHours} hour${timeLeftInHours > 1 ? 's' : ''}`
  }
  displayExpiration()

  return (
    <CardWrapper>
      <Group>
        <Title>name: </Title><Name>{slug}</Name>
        <span>
          <CopyButton>
            copy link
          </CopyButton>
          <DeleteButton onClick={() => handleDelete(id)}>
            delete
          </DeleteButton>
        </span>
      </Group>
      <Group>
        <Title>short link: </Title><a href={`${FRONTEND_APP_URL}/${slug}`}>{shortFrontendUrl}/<PrettySlug>{slug}</PrettySlug></a>
      </Group>
      <Group>
        <Title>long link: </Title>
        <PrettyLongLink value={redirect} readOnly />
      </Group>
      <Group>
        <Title>expires: </Title>{displayExpiration()}
      </Group>
    </CardWrapper>
  )
}

export default LinkCard;
