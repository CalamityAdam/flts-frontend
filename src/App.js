import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { useStateValue } from './state';
import { LinkForm, CopyToClipboard } from './components';
import { BACKEND_APP_URL } from './lib/endpoints';
axios.defaults.withCredentials = true;

const AppContainer = styled.div`
  text-align: center;
  font-size: 10px;
  background-color: #273136;
  color: white;
  height: 100vh;
  width: 100vw;
  position: relative;
  display: inline-block;
`;

const Container = styled.div`
  text-align: center;
  display: inline-block;
  /* width: 450px; */
  @media (max-width: 1300px) {
    width: 50vw;
  }
  @media (max-width: 900px) {
    width: 75vw;
  }
  @media (max-width: 700px) {
    width: 100vw;
  }
`;

const Jumbotron = styled.h1`
  margin: 0 0 .75em 0;
  padding: .25em 0 .25em 0;
  font-size: 7em;
  @media (max-width: 700px) {
    font-size: 5em;
  }
  width: 100vw;
  height: auto;
  background-color: #4EADDE;
  position: relative;
`;

const Error = styled.h1`
  font-size: 3em;
  color: red;
`;

const App = props => {
  const [{ error, user, newUrl }, dispatch] = useStateValue();

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
    const checkIfUser = async () => { 
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
      <Jumbotron>Make Short Links</Jumbotron>
      {error && <Error>{error}</Error>}
      <Container>
        {!newUrl ? (
          <LinkForm />
        ) : (
          <CopyToClipboard newUrl={newUrl} />
        )}
      </Container>
    </AppContainer>
  );
};

export default App;
