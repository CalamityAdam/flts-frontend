import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { useStateValue } from './state';
axios.defaults.withCredentials = true;

const BACKEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://flts-backend.herokuapp.com';

const FRONTEND_APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://adumb.dev';

const App = props => {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [expiration, setExpiration] = useState(5);
  const [copySuccess, setCopySuccess] = useState(false);
  // set up the ref (which will later be re-assigned) from which to copy to clipboard
  const textAreaRef = useRef(null);
  
  const [{ error, user }, dispatch] = useStateValue();
  const loggedIn = !!user.id;

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
   * execute the copy to clipboard
   */
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess(true);
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
    // if (loggedIn) {
    //   newRedirect.userId = user.id
    // }
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

  /**
   * expiration time settings
   */
  const options = [
    { value: 5, text: '5 mins' },
    { value: 60, text: '1 hour' },
    { value: 720, text: '12 hours' },
    { value: 1440, text: '1 day' },
  ];
  if (loggedIn) {
    // only logged in users can have permanent links
    options.push({
      value: 0,
      text: 'permanant',
    })
  }
  
  return (
    <div className="App">
      <h1 className="jumbotron" >Make Short Links</h1>
      {error && <h1 className="h1-error">{error}</h1>}
      <div className="container">
        {!newUrl ? (
          // don't show the form if we got a new URL just made
          <div className="main-form">
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="url">
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
              <label className="form-label" htmlFor="slug">
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
                  <label className="form-label select-label" htmlFor="expiration">
                    Expiration
                  </label>
                  <select
                    name="expiration"
                    onChange={(e, data) => setExpiration(e.target.value)}
                    value={expiration}
                  >
                    {options.map(({ value, text }) => (
                      <option key={Math.random() * 100} value={value}>
                        {text}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  className="fancy-button" 
                  type="submit"
                >Shorten!</button>
              </div>
            </form>
          </div>
        ) : (
          // we got a URL!
          <>
            <h1>
              NICE!
            </h1>
            <form>
              <textarea ref={textAreaRef} value={newUrl} readOnly />
              {document.queryCommandSupported('copy') && (
                <button onClick={copyToClipboard} disabled={copySuccess}>
                  {copySuccess ? 'Copied!' : 'Copy to clipboard'}
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
