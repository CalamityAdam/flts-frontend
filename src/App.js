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
  /* height: 100vh; */
  width: 100vw;
  position: relative;
  display: inline-block;
`;

const Container = styled.div`
  border: 2px solid whitesmoke;
  background-color: white;
  border-radius: 10px;
  margin-top: 4rem;
  padding: 2rem 1.5rem 2rem 1.5rem;
  box-shadow: 6px 6px 8px #273136;
  text-align: center;
  display: inline-block;
  width: 50vw;
  @media (max-width: 1300px) {
    width: 65vw;
  }
  /* @media (max-width: 900px) {
    width: 75vw;
  } */
  @media (max-width: 700px) {
    width: 100vw;
  }
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
    <AppContainer className="main app container">
      <Navbar />
      {error && <Error>{error}</Error>}
      <Container>
        <Routes />
      </Container>
    </AppContainer>
  );
};

export default App;
