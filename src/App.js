import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { useStateValue } from './state';
import { Navbar } from './components';
import Error from './components/styles/Error';
import Routes from './Routes';
import { BACKEND_APP_URL } from './lib/endpoints';
axios.defaults.withCredentials = true;

const AppContainer = styled.div`
  text-align: center;
  font-size: 10px;
  /* background-color: #273136; */
  color: black;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  /* width: 100vw; */
  /* position: relative; */
  /* display: inline-block; */
  @media (max-width: 700px) {
    display: none;
  };
`;

function App(props) {
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

  return (
    <AppContainer>
      <Navbar />
      {error && <Error>{error}</Error>}
      <Routes />
    </AppContainer>
  );
};

export default App;
