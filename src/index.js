import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './state';
import Redirect from './Redirect';
import NotFound from './NotFound';


const initialState = {
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setError':
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}


ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <Redirect path='/:slug' />
      <NotFound path='notfound' />
      <App default path='/' />
    </Router>
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
