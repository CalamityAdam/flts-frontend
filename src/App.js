import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useStateValue } from './state';
import { LinkForm, CopyToClipboard } from './components';
axios.defaults.withCredentials = true;

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

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
    <div className="App">
      <h1 className="jumbotron" >Make Short Links</h1>
      {error && <h1 className="h1-error">{error}</h1>}
      <div className="container">
        {!newUrl ? (
          <LinkForm />
        ) : (
          <CopyToClipboard newUrl={newUrl} />
        )}
      </div>
    </div>
  );
};

export default App;
