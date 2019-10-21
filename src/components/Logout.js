import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import { BACKEND_APP_URL } from '../lib/endpoints';
import { useStateValue } from '../state';
import FancyButton from './styles/FancyButton';

const Logout = (props) => {
  const [, dispatch] = useStateValue();
  
  async function handleClick() {
    await axios.post(`${BACKEND_APP_URL}/auth/logout`)
    navigate('/');
    dispatch({ type: 'removeUser' })
  }
  return (
    <>
      <div style={{fontSize: '2rem', marginBottom: '1rem'}}>
        We're sad to see you go :(
      </div>
      <FancyButton onClick={handleClick}>logout</FancyButton>
    </>
  )
};

export default Logout;
