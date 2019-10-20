import React, { useState } from 'react';
import axios from 'axios';
import { useStateValue } from '../state';
axios.defaults.withCredentials = true;

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const FRONTEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://adumb.dev';


const LinkForm = props => {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [expiration, setExpiration] = useState(5);
  
  const [{ error, user }, dispatch] = useStateValue();
  const loggedIn = !!user.id;
  
  /**
   * expiration time settings
   */
  const options = [
    { value: 5, text: '5 mins' },
    { value: 60, text: '1 hour' },
    { value: 720, text: '12 hours' },
    { value: 1440, text: '1 day' },
  ];
  // only logged in users can have permanent links
  if (loggedIn) {
    options.push({
      value: 0,
      text: 'permanant',
    });
  }


  /**
   * dispatch error
   */
  function setError(newError) {
    dispatch({
      type: 'setError',
      error: newError,
    });
  }

  /**
   * send post req to create the new redirect
   */
  async function createRedirect(newShorten) {
    try {
      const { data } = await axios.post(
        `${BACKEND_APP_URL}/api/shorten/`,
        newShorten,
      );
      const newUrl = `${FRONTEND_APP_URL}/${data.slug}`;
      dispatch({
        type: 'setNewUrl',
        newUrl,
      })
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data);
      } else {
        console.error(err);
      }
    }
  }

  /**
   * handle submit and build the new redirect object
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidUrl(redirect)) return;
    setError('');
    const newRedirect = {
      slug,
      redirect,
      expiration,
      userId: user.id || null,
    };
    createRedirect(newRedirect);
  }

  /**
   * validate if url entered is valid
   */
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      setError('URL not valid');
      return false;
    }
  }

  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <label 
          className="form-label" 
          htmlFor="url"
        >
          URL to shorten
        </label>
        <input
          className={`nice-input ${error === 'URL not valid' ? 'form-error' : ''}`}
          type="textarea"
          name="url"
          onChange={(e, data) => setRedirect(e.target.value)}
          label="URL to shorten:"
          placeholder="https://..."
        />
        <label 
          className="form-label" 
          htmlFor="slug"
        >
          Custom /name
        </label>
        <input
          className="nice-input"
          type="text"
          name="slug"
          onChange={(e, data) => setSlug(e.target.value)}
          label="preferred slug"
          placeholder="Leave blank for random generated text"
        />
        <div className="select-button-container">
          <div className="select-button">
            <label 
              className="form-label select-label" 
              htmlFor="expiration"
            >
              Expiration
            </label>
            <select
              name="expiration"
              onChange={(e, data) => setExpiration(e.target.value)}
              value={expiration}
            >
              {options.map(({ value, text }) => (
                <option key={Math.random() * 1000} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <button
            className="fancy-button"
            type="submit"
          >
            Shorten!
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;
