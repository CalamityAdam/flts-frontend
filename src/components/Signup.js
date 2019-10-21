import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { useStateValue } from '../state';
import NiceInput from './styles/NiceInput';
import Label from './styles/Label';
import FancyButton from './styles/FancyButton';

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const Signup = props => {
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
      const res = await axios.post(`${BACKEND_APP_URL}/auth/signup`, user);
      dispatch({
        type: 'getUser',
        user: res.data
      })
      navigate('/')
    } catch (err) {
      // TODO display mesasge
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email:</Label>
      <NiceInput
        type="text"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <Label htmlFor="password">Password:</Label>
      <NiceInput
        type="password"
        name="email"
        onChange={e => setPassword(e.target.value)}
      />
      <FancyButton type="submit">sign up!</FancyButton>
    </form>
  );
};

export default Signup;
