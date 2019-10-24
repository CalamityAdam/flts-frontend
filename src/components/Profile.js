import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BACKEND_APP_URL } from '../lib/endpoints';
import { useStateValue } from '../state';
import { LinkCard } from './index';
// import { ProfileHeader } from './index';
axios.defaults.withCredentials = true;

const ProfileWrapper = styled.div`
  display: flex;
  margin: 2rem;
  flex-direction: column;
  /* flex-flow: row wrap; */
  align-items: center;
`;

const Profile = props => {
  const [myShortens, setMyShortens] = useState([]);
  const [loading, setLoading] = useState(false)
  const [{ user }] = useStateValue();

  useEffect(() => {
    async function fetchShortens() {
      try {
        setLoading(true)
        if (user.id) {
          const res = await axios.get(
            `${BACKEND_APP_URL}/api/users/${user.id}`,
          );
          const { shortens } = res.data;
          setMyShortens(shortens);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchShortens();
  }, [user.id]);

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${BACKEND_APP_URL}/api/shorten/${id}`)
      setMyShortens(myShortens => myShortens.filter(m => m.id !== id))
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <ProfileWrapper>
        <h1>Loading...</h1>
      </ProfileWrapper>
    )
  }
  
  return (
    <>
      <ProfileWrapper>
        {!myShortens.length && <h1>you don't have any links my friend</h1>}
        {myShortens.map(shorten => (
          <LinkCard
          key={shorten.id}
          shorten={shorten}
          handleDelete={handleDelete}
          />
        ))}
      </ProfileWrapper>
    </>
  );
};

export default Profile;
