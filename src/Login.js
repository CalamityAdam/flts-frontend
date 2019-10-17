import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { useStateValue } from './state';
axios.defaults.withCredentials = true;

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatch] = useStateValue();
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      const res = await axios.post(`${BACKEND_APP_URL}/auth/login`, user);
      dispatch({
        type: 'getUser',
        user: res.data
      })
      navigate('/')
    } catch (err) {
      // incorrect login..
      // TODO display message
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="email"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">login!</button>
    </form>
  );
};

export default Login;
