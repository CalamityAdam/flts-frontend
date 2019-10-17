import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

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
