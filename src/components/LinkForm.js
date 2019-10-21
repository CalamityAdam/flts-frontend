import React, { useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { useStateValue } from '../state';
import { BACKEND_APP_URL, FRONTEND_APP_URL } from '../lib/endpoints';
import FancyButton from './styles/FancyButton';
axios.defaults.withCredentials = true;

const Label = styled.label`
  font-size: 1.75em;
`;

const NiceInput = styled.input`
  /* font-family: 'Major Mono Display', monospace; */
  font-size: 2em;
  width: 95%;
  padding: .5em;
  margin: 0 .5em .5em .5em;
  box-sizing: border-box;
  border-radius: 5px;
  white-space: nowrap;
  
  ${props => props.error && css`
    border: 3px solid red;
  `}
`;

const SelectLabel = styled.label`
  font-size: 1.75em;
  display: block;
`;

const Select = styled.select`
  width: 10em;
  font-size: 2em;
  height: 2em;
  padding: .5em;
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
          type="text"
          name="slug"
          onChange={(e, data) => setSlug(e.target.value)}
          label="preferred slug"
          placeholder="Leave blank for random generated text"
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
