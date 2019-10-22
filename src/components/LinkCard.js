import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { FRONTEND_APP_URL } from '../lib/endpoints'
axios.defaults.withCredentials = true;

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
  font-size: 1.5rem;
  color: red;
  background: transparent;
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
          <DeleteButton onClick={() => handleDelete(id)}>
            delete
          </DeleteButton>
        </span>
      </Group>
      <Group>
        <Title>short link: </Title><a href={`${FRONTEND_APP_URL}/${slug}`}>{FRONTEND_APP_URL}/<PrettySlug>{slug}</PrettySlug></a>
      </Group>
      <Group>
        <Title>long link: </Title><a href={redirect}>{redirect}</a>
      </Group>
      <Group>
        <Title>expires: </Title>{displayExpiration()}
      </Group>
    </CardWrapper>
  )
}

export default LinkCard;
