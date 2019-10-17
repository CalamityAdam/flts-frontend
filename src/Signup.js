import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      const res = await axios.post(`${BACKEND_APP_URL}/auth/signup`, user);
      console.log('signup res: ', res.data)
    } catch (err) {
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
      <button type="submit">signup!</button>
    </form>
  );
};

export default Signup;
