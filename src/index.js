import React from 'react';
import ReactDOM from 'react-dom';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './state';
import { BACKEND_APP_URL } from './lib/endpoints';
import { useStateValue } from './state';

const defaultUser = {};
/**
 * initial state
 */
const initialState = {
  error: '',
  user: defaultUser,
  newUrl: '',
  stickyNavbar: false,
  viewFilter: 'mine',
  searchQuery: '',
};

/**
 * reducer
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setError':
      return {
        ...state,
        error: action.error,
      };
    case 'getUser':
      return {
        ...state,
        user: action.user,
      };
    case 'setNewUrl':
      return {
        ...state,
        newUrl: action.newUrl,
      };
    case 'removeUser':
      return {
        ...state,
        user: defaultUser,
      };
    case 'setStickyNavbar':
      return {
        ...state,
        stickyNavbar: action.stickyNavbar,
      };
    case 'setViewFilter':
      return {
        ...state,
        viewFilter: action.viewFilter,
      };
    case 'setSearchQuery':
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    default:
      return state;
  }
};

/**
 * this has to be at the top level to check for a redirect immediately.
 * check if a path after domain name, if there is query the DB to search
 * for a redirect, if found force redirect, else warn for URL not found.
 */
function InitialRedirect({ closeToast }) {
  const [, dispatch] = useStateValue();
  const loadingToastId = 'loading-toast';
  const redirectToastId = 'redirect-error';
  const allowedPaths = [
    'profile',
    'login',
    'logout',
    'signup',
    'links',
    'do not-use-logout',
  ];
  const path = window.location.pathname
    .split('')
    .filter(x => x !== '/')
    .join('');

  if (path && !allowedPaths.includes(path)) {
    if (!toast.isActive(loadingToastId)) {
      toast.info('👀looking...', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        toastId: loadingToastId,
      });
    }
    fetch(`${BACKEND_APP_URL}/api/shorten/${path}`)
      .then(res => res.json())
      .then(({ redirect, message }) => {
        if (message) {
          // not found
          if (!toast.isActive(redirectToastId)) {
            toast.error('😢URL not found', {
              position: toast.POSITION.TOP_CENTER,
              toastId: redirectToastId,
              autoClose: 3000,
            });
          }
          dispatch({
            type: 'setError',
            error: message,
          });
          navigate('/');
        } else {
          // closeToast();
          toast.success('😎BEING REDIRECTED...😎', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          // found a slug, REDIRECT!
          // window.location.replace(redirect_to);
          window.location.href = redirect;
        }
      })
      .catch(err => console.error(err));
    return (
      null
    );
  }
  return null;
}

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <InitialRedirect />
    <ToastContainer />
    <App />
  </StateProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
