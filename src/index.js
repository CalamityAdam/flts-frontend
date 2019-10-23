import React from 'react';
import ReactDOM from 'react-dom';
import { navigate } from '@reach/router';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './state';
import { BACKEND_APP_URL } from './lib/endpoints';
import { useStateValue } from './state';

const defaultUser = {};
const initialState = {
  error: '',
  user: defaultUser,
  newUrl: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setError':
      return {
        ...state,
        error: action.error,
      }
    case 'getUser':
      return {
        ...state,
        user: action.user,
      }
    case 'setNewUrl':
      return {
        ...state,
        newUrl: action.newUrl,
      }
    case 'removeUser':
      return {
        ...state,
        user: defaultUser,
      }
    default:
      return state;
  }
}

function InitialRedirect() {
  const [, dispatch] = useStateValue();

  const allowedPaths = [ 'profile' ,'login' ,'logout' ,'signup' ,'links'];
  const path = window.location.pathname
  .split('')
  .filter(x => x !== '/')
  .join('');
  if (path && !allowedPaths.includes(path)) {
  fetch(`${BACKEND_APP_URL}/api/shorten/${path}`)
    .then(res => res.json())
    .then(({ redirect, message }) => {
      if (message) {
        // not found
        dispatch({
          type: 'setError',
          error: message
        })
        navigate('/')
      } else {
        // found a slug, REDIRECT!
        // window.location.replace(redirect_to);
        window.location.href = redirect;
      }
    })
    .catch(err => console.error(err));
    return (
      <h1> being redirected</h1>
    )
  }
  return null;
}

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <InitialRedirect />
    <App />
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
