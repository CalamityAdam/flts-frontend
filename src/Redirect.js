import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useStateValue } from './state';

const BACKEND_APP_URL = 'https://flts-backend.herokuapp.com';

const Redirect = ({ slug }) => {
  const [, dispatch] = useStateValue();
  
  useEffect(() => {
    if (slug) {
      fetch(`${BACKEND_APP_URL}/api/shorten/${slug}`)
        .then(res => res.json())
        .then(({ redirect, message }) => {
          if (message) {
            // not found
            console.log(message);
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
    } else {
      navigate('/')
    }
  });
  if (false) {
    // this is just to get rid of unused React warnings
    return (<div></div>)
  }
  return null
}

export default Redirect
