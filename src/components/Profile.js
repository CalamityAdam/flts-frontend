import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BACKEND_APP_URL } from '../lib/endpoints';
import useWindowDimensions from '../lib/useWindowDimensions';
import { useStateValue } from '../state';
import { LinkCard } from './index';
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
  const [loading, setLoading] = useState(false);
  const [{ user, viewFilter, searchQuery }] = useStateValue();
  const { width } = useWindowDimensions();
  const TOAST_POSITION = width <= 700 ? 'BOTTOM_CENTER' : 'TOP_CENTER';

  function searchFilter(x) {
    return x.slug.includes(searchQuery) || x.redirect.includes(searchQuery);
  }

  /**
   * this is COOL
   * viewFilter is added as dependency to the hook, so if the radio button
   * in the navbar is clicked to change view form my links to all links
   * this hooks will run again and update accordingly
   */
  useEffect(() => {
    async function getShortens() {
      try {
        if (viewFilter === 'mine') {
          setLoading(true);
          const res = await axios.get(
            `${BACKEND_APP_URL}/api/users/${user.id}`,
          );
          const { shortens } = res.data;
          setMyShortens(shortens);
          setLoading(false);
        } else {
          setLoading(true);
          const res = await axios.get(`${BACKEND_APP_URL}/api/shorten`);
          setMyShortens(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getShortens();
  }, [user.id, viewFilter]);

  /**
   * handle fetch delete here and pass down function to LinkCard
   */
  async function handleDelete(id) {
    try {
      await axios.delete(`${BACKEND_APP_URL}/api/shorten/${id}`);
      toast.success('👍 deleted!', {
        position: toast.POSITION[TOAST_POSITION],
        autoClose: 3000,
      });
      setMyShortens(myShortens => myShortens.filter(m => m.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    // TODO change this to spinner
    return (
      <ProfileWrapper>
        <h1>Loading...</h1>
      </ProfileWrapper>
    );
  }

  return (
    <>
      <ProfileWrapper>
        {!myShortens.length && <h1>you don't have any links my friend</h1>}
        {myShortens.filter(searchFilter).map(shorten => (
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
