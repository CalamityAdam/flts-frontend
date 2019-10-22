import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_APP_URL } from '../lib/endpoints';
import { useStateValue } from '../state';
import { LinkCard } from './index';
axios.defaults.withCredentials = true;

const Profile = props => {
  const [myShortens, setMyShortens] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    async function fetchShortens() {
      try {
        if (user.id) {
          const res = await axios.get(
            `${BACKEND_APP_URL}/api/users/${user.id}`,
          );
          const { shortens } = res.data;
          setMyShortens(shortens);
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

  return (
    <>
      {!myShortens.length && (
        <h1>sorry friend, you don't have any active links</h1>
      )}
      <ul>
        {myShortens.map(shorten => (
          <LinkCard
            key={shorten.id}
            shorten={shorten}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
};

export default Profile;
