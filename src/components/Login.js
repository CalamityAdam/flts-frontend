import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { useStateValue } from '../state';
import { BACKEND_APP_URL } from '../lib/endpoints';
import Label from './styles/Label';
import NiceInput from './styles/NiceInput';
import FancyButton from './styles/FancyButton';
axios.defaults.withCredentials = true;

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
      <FancyButton type="submit">login!</FancyButton>
    </form>
  );
};

export default Login;
