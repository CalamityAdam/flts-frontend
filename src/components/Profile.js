import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BACKEND_APP_URL } from '../lib/endpoints'
import { useStateValue } from '../state';
import { LinkCard } from './index';
axios.defaults.withCredentials = true;

const ProfileWrapper = styled.div`
  font-size: 2rem;
`;

const Profile = (props) => {
  const [myShortens, setMyShortens] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  
  useEffect(() => {
    async function fetchShortens() {
      try {
        if (user.id) {
          const res = await axios.get(`${BACKEND_APP_URL}/api/users/${user.id}`)
          const { shortens } = res.data;
          setMyShortens(shortens);
        }
      } catch (err) {
        console.log(err)
      }
    }
    
    fetchShortens()
  }, [user.id])
  
  return (
      <ul>
        {myShortens.map((shorten) => (
          <LinkCard key={shorten.id} shorten={shorten} />
        ))}
      </ul>
  )
}

export default Profile;
