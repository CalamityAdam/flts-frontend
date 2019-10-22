import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStateValue } from '../state';
import { BACKEND_APP_URL, FRONTEND_APP_URL } from '../lib/endpoints';
import { reservedNames } from '../lib/reservedNames';
import FancyButton from './styles/FancyButton';
import Label from './styles/Label';
import NiceInput from './styles/NiceInput';
axios.defaults.withCredentials = true;

const SelectLabel = styled.label`
  font-size: 1.75rem;
  display: block;
`;

const Select = styled.select`
  text-align: center;
  width: 10rem;
  font-size: 1.5rem;
  height: 2rem;
  padding: .5rem;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;


const LinkForm = props => {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [expiration, setExpiration] = useState(720);
  
  const [{ error, user }, dispatch] = useStateValue();
  const loggedIn = !!user.id;
  useEffect(() => {
    if (loggedIn) {
      setExpiration(0)
    }
  }, [loggedIn])
  
  
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
      text: 'Permanent',
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
  
  async function silentAuth() {
    try {
      const auth = {
        name: redirect,
        check: slug,
      };
      const { data } = await axios.post(
        `${BACKEND_APP_URL}/auth/silentauth`,
        auth
      );
      dispatch({
        type: 'getUser',
        user: data,
      })
      setError(`welcome, friend :)`)
      setRedirect('')
      setSlug('')
    } catch (err) {
      console.log(err);
      setError('URL not valid')
    }
  }

  /**
   * handle submit and build the new redirect object
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidUrl(redirect)) {
      if (redirect === 'admin') {
        setError('')
        silentAuth()
      }
      return;
    }
    if (!isNameValid(slug)) return;
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
  
  function isNameValid(string) {
    if (reservedNames.includes(string)) {
      setError('custom name taken')
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="url">
          URL to shorten
        </Label>
        <NiceInput
          // className={`nice-input ${error === 'URL not valid' ? 'form-error' : ''}`}
          error={error === 'URL not valid'}
          type="textarea"
          name="url"
          onChange={(e, data) => setRedirect(e.target.value)}
          label="URL to shorten:"
          placeholder="https://..."
        />
        <Label htmlFor="slug">
          Custom /name
        </Label>
        <NiceInput
          error={error === 'custom name taken'}
          type="text"
          name="slug"
          onChange={(e, data) => setSlug(e.target.value)}
          label="preferred slug"
          placeholder="Leave blank for random"
        />
        <SelectContainer>
          <div className="select-button">
            <SelectLabel htmlFor="expiration">
              Expiration
            </SelectLabel>
            <Select
              name="expiration"
              onChange={(e, data) => setExpiration(e.target.value)}
              value={expiration}
            >
              {options.map(({ value, text }) => (
                <option key={Math.random() * 1000} value={value}>
                  {text}
                </option>
              ))}
            </Select>
          </div>
          <FancyButton type="submit">
            Shorten!
          </FancyButton>
        </SelectContainer>
      </form>
    </div>
  );
};

export default LinkForm;
