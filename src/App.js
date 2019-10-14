import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  Button,
  Container,
  Dropdown,
  Header,
  TextArea,
} from 'semantic-ui-react';
import axios from 'axios';
import './App.css';
import { useStateValue } from './state';

const BACKEND_APP_URL = 'https://flts-backend.herokuapp.com';
const FRONTEND_APP_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://adumb.dev'

const App = props => {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [expiration, setExpiration] = useState(5);
  const [newUrl, setNewUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  // set up the ref (which will later be re-assigned) from which to copy to clipboard
  const textAreaRef = useRef(null);

  const [{ error }, dispatch] = useStateValue();

  // dispatch error
  function setError(newError) {
    dispatch({
      type: 'setError',
      error: newError,
    });
  }

  // execute the copy to clipboard
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(true);
  }

  // send post req to create the new redirect
  async function createRedirect(newShorten) {
    try {
      const { data } = await axios.post(
        `${BACKEND_APP_URL}/api/shorten/`,
        newShorten,
      );
      const newUrl = `${FRONTEND_APP_URL}/${data.slug}`;
      console.log('yay', data);
      console.log('new url: ', newUrl);
      setNewUrl(newUrl);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data);
      } else {
        console.error(err);
      }
    }
  }

  // handle submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidUrl(redirect)) return;
    setError('');
    const newRedirect = {
      slug,
      redirect,
      expiration,
    };
    console.log(newRedirect);
    createRedirect(newRedirect);
  }

  // validate if url entered is valid
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      setError('URL not valid');
      return false;
    }
  }

  // expiration time settings
  const options = [
    { value: 5, text: '5 mins' },
    { value: 30, text: '30 mins' },
    { value: 60, text: '1 hour' },
    { value: 1440, text: '24 hours' },
  ];

  return (
    <div className="App">
      <h1 className="jumbotron">Fix That Link, Shorter</h1>
      {error && <h1 className="h1-error">{error}</h1>}
      <div className="container">
        {!newUrl ? (
          // don't show the form if we got a new URL just made
          <div className="main-form">
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="url">URL to shorten</label>
              <input
                className={error === 'URL not valid' ? 'form-error' : ''}
                type="text"
                name="url"
                onChange={(e, data) => setRedirect(e.target.value)}
                label="URL to shorten:"
                placeholder="https://..."
              />
              <label className="form-label" htmlFor="slug">Custom /name</label>
              <input
                type="text"
                name="slug"
                onChange={(e, data) => setSlug(e.target.value)}
                label="preferred slug"
                placeholder="Leave blank for random generated text"
              />
              <select
                onChange={(e, data) => setExpiration(e.target.value)}
                value={expiration}
              >
                {options.map(({value, text}) => (
                  <option key={Math.random()*100} value={value}>{text}</option>
                ))}
              </select>
              <button type="submit">Shorten!</button>
            </form>
          </div>
        ) : (
          // we got a URL!
          <>
            <Header as="h1" color="blue">
              NICE!
            </Header>
            <form>
              <textarea ref={textAreaRef} value={newUrl} readOnly />
              {document.queryCommandSupported('copy') && (
                <Button onClick={copyToClipboard} disabled={copySuccess}>
                  {copySuccess ? 'Copied!' : 'Copy to clipboard'}
                </Button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
