import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import { BACKEND_APP_URL } from '../lib/endpoints';

const Logout = (props) => {
  async function handleClick() {
    await axios.post(`${BACKEND_APP_URL}/auth/logout`)
    navigate('/');
  }
  return (
    <button onClick={handleClick}>logout</button>
  )
};

export default Logout;
