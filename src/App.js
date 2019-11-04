import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { useStateValue } from './state';
import { Navbar, Header } from './components';
import GetLocation from './components/GetLocation';
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
  @media (max-width: 700px) {
    background-color: #273136;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
  }
`;

function App({ currentPath, ...rest }) {
  const [{ user }, dispatch] = useStateValue();
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
      <Routes />
    </AppContainer>
  );
};

export default GetLocation(App);
