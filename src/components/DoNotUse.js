import React from 'react';
import axios from 'axios';
import { BACKEND_APP_URL } from '../lib/endpoints';
axios.defaults.withCredentials = true;

function DoNotUse() {
  async function logout() {
    try {
      await axios.post(`${BACKEND_APP_URL}/auth/do-not-use-super-secret-force-logout`)
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <button onClick={logout}>DO NOT CLICK!</button>
  )
}

export default DoNotUse;
