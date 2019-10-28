import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { useStateValue } from './state';
import { Navbar, Header } from './components';
import GetLocation from './components/GetLocation'
import Error from './components/styles/Error';
import Routes from './Routes';
import { BACKEND_APP_URL } from './lib/endpoints';
axios.defaults.withCredentials = true;

const AppContainer = styled.div`
  text-align: center;
  font-size: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  /* background-color: #273136; */
  /* height: 100vh; */
  /* width: 100vw; */
  /* position: relative; */
  /* display: inline-block; */
  @media (max-width: 700px) {
    display: none;
  };
`;

function App({ currentPath, ...rest }) {
  const [{ error, user }, dispatch] = useStateValue();
  /**
   * "componentDidMount"
   * check if loggedIn user
   */
  useEffect(() => {
    function setUser(user) {
      dispatch({
        type: 'getUser',
        user,
      })
    }
    async function checkIfUser() {
      try {
        if (!user.id) {
          const res = await axios.get(`${BACKEND_APP_URL}/auth/me`)
          if (res.data) {
            setUser(res.data)
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkIfUser();
  }, [user.id, dispatch]);
  const loggedIn = !!user.id;

  return (
    <AppContainer>
      <Header />
      {loggedIn && <Navbar />}
      {error && <Error>{error}</Error>}
      <Routes />
    </AppContainer>
  );
};

export default GetLocation(App);
