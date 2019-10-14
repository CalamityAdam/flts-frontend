import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useStateValue } from './state';

const Redirect = ({ slug }) => {
  const [{ error }, dispatch] = useStateValue();
  
  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:4000/api/shorten/${slug}`)
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
    }
  });
  
  return null
}

export default Redirect
