import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { toast } from 'react-toastify';
import { useStateValue } from '../state';
import { BACKEND_APP_URL, FRONTEND_APP_URL } from '../lib/endpoints';
import { reservedNames } from '../lib/reservedNames';
import useWindowDimensions from '../lib/useWindowDimensions';
import Label from './styles/Label';
import NiceInput from './styles/NiceInput';
// const RESTRICTED_CHARACTERS

axios.defaults.withCredentials = true;

function LinkForm(props) {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [expiration, setExpiration] = useState(720);
  const [{ error, user }, dispatch] = useStateValue();
  const { width } = useWindowDimensions();
  // const TOAST_POSITION = width <= 700 ? 'BOTTOM_CENTER' : 'TOP_CENTER';
  const TOAST_POSITION = 'TOP_CENTER';
  const loggedIn = !!user.id;
  const urlToastId = 'url-error';
  const slugToastId = 'slug-error';
  // only logged in users can have permanent links
  useEffect(() => {
    if (loggedIn) {
      setExpiration(0);
    }
  }, [loggedIn]);

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
  async function createShorten(newShorten) {
    try {
      const { data } = await axios.post(
        `${BACKEND_APP_URL}/api/shorten/`,
        newShorten,
      );
      const newUrl = `${FRONTEND_APP_URL}/${data.slug}`;
      dispatch({
        type: 'setNewUrl',
        newUrl,
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        toast.error('🙅‍custom name taken', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        })
        setError(err.response.data);
      } else {
        console.error(err);
      }
    }
  }
  
  /**
   * Silent Auth - when "admin" is typed into the URL input, send both the URL
   * input and the Custom Name input to the silentAuth route. check will be
   * handled on backend for accuract of credentials
   */
  async function silentAuth() {
    try {
      const auth = {
        name: redirect,
        check: slug,
      };
      const { data } = await axios.post(
        `${BACKEND_APP_URL}/auth/silentauth`,
        auth,
      );
      dispatch({
        type: 'getUser',
        user: data,
      });
      toast.success('😄 welcome friend', {
        position: toast.POSITION.BOTTOM_LEFT,
      })
      setRedirect('');
      setSlug('');
    } catch (err) {
      console.log(err);
      if (!toast.isActive(urlToastId)) {
        toast.warn('🚫 URL not valid', {
          position: toast.POSITION[TOAST_POSITION],
          toastId: urlToastId,
          autoClose: 3000,
        })
      }
      setError('URL not valid');
    }
  }

  /**
   * handle submit and build the new shorten object
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (error) {
      // clean up errors
      setError('');
    }
    // check if URL input is a valid url
    if (!isValidUrl(redirect)) {
      // if not valid, first check if attempted silent auth
      if (redirect === 'admin') {
        setError('');
        silentAuth();
        return;
      }
      // this URL is NOT valid
      if (!toast.isActive(urlToastId)) {
        toast.warn('🚫 URL not valid', {
          position: toast.POSITION[TOAST_POSITION],
          toastId: urlToastId,
          autoClose: 3000,
        })
      }
      setError('URL not valid');
      return;
      }
    let filteredSlug = slug.replace(/\s/g, '-')
    if (!isNameValid(filteredSlug)) return;
    // check for special characters
    const specialCharacterRexExp = /[~`!@#$%^&*()_+={\[}\]|\\<>?,./}]/g
    if (specialCharacterRexExp.test(filteredSlug)) {
      toast.warn('🚫no special characters!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setError('no special characters');
      return;
    }
    setError('');
    const newRedirect = {
      slug: filteredSlug,
      redirect: redirect,
      expiration,
      userId: user.id || null,
    };
    createShorten(newRedirect);
  }

  /**
   * validate if url entered is valid
   */
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * validte that custom name is not an internally reserved word
   */
  function isNameValid(string) {
    if (reservedNames.includes(string)) {
      if (!toast.isActive(slugToastId)) {
        toast.warn('🚫 custom name taken', {
          position: toast.POSITION[TOAST_POSITION],
          toastId: slugToastId,
          autoClose: 3000,
        })
      }
      setError('custom name taken');
      return false;
    } else {
      return true;
    }
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormContainer className="form-container">
          <Group className="group">
            <Label htmlFor="url">URL to shorten</Label>
            <NiceInput
              className="nice-input"
              error={error === 'URL not valid'}
              type="textarea"
              name="url"
              value={redirect}
              onChange={(e, data) => setRedirect(e.target.value)}
              placeholder={width < 700 ? "URL to shorten" : "https://..."}
            />
          </Group>
          <Group>
            <Label htmlFor="slug">Customize it!</Label>
            <TinyInstructions>leave blank for random</TinyInstructions>
            <SlugSpan>
              <SlugText>
                adumb.dev/
              </SlugText>
              <SlugInput
                error={
                  error === 'custom name taken' ||
                  error === 'no special characters'
                }
                type="textarea"
                name="slug"
                value={slug}
                onChange={(e, data) => setSlug(e.target.value)}
                placeholder={width < 700 ? "custome /name" : "random"}
              />
            </SlugSpan>
          </Group>
          <GroupSelect>
            <SelectLabel htmlFor="expiration">Expiration</SelectLabel>
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
          </GroupSelect>
        </FormContainer>
        <ShortenButton type="submit">Shorten!</ShortenButton>
      </form>
    </Wrapper>
  );
}

export default LinkForm;

/**
 * Styled Components
 */
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 700px) {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
`;

const FormContainer = styled.div`
  border: 2px solid whitesmoke;
  background-color: white;
  border-radius: 10px;
  margin-top: 4rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  box-shadow: 6px 6px 20px #273136, -6px -6px 20px #273136, -6px 6px 20px #273136, 6px -6px 20px #273136;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 50vw;
  @media (max-width: 1300px) {
    width: 65vw;
  }
  @media (max-width: 700px) {
    background-color: #273136;
    color: white;
    margin: 0;
    padding: 0;
    padding-top: 3rem;
    width: 100vw;
    border: none;
    box-shadow: none;
  }
`;

const SlugInput = styled.input`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  box-shadow: 2px 2px 5px #273136;
  border: 1px solid #273136;
  border-radius: 5px;
  min-width: 0;
  ${props =>
    props.error &&
    css`
      border: 3px solid red;
  `}
  @media (max-width: 700px) {
    margin: .5rem;
    padding: .5rem;
    font-size: 1.5rem;
  }
`;

const SlugSpan = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

const SlugText = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: 2rem;
  text-transform: lowercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: .5rem;
  @media (max-width: 700px) {
    display: none;
    font-size: 1.5rem;
  }
`;

const ShortenButton = styled.button`
  font-family: 'Ubuntu';
  background-color: #59C8FF;
  width: auto;
  font-size: 4rem;
  text-transform: uppercase;
  border: 2px solid #273136;
  box-shadow: 2px 2px 5px black;
  border-radius: 1rem;
  margin: 1rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  text-decoration: bold;
  &:active {
    box-shadow: 0px 0px 1px #273136;
    transform: translateY(2px) translateX(1px);
  };
  &:focus {
    outline: 0;
  };
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    background-color: white;
    border: 3px solid #59C8FF;
    font-size: 3rem;
  }
`;

const Group = styled.div`
  margin: 1rem 0 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  @media (max-width: 700px) {
    margin: .5rem;
    padding: .5rem;
  }
`;
const GroupSelect = styled.div`
  margin: 1rem 0 1.5rem 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  text-align: left;
  @media (max-width: 700px) {
    margin: .5rem;
    padding: .5rem;
  }
`;

const SelectLabel = styled.label`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 2.5rem;
  margin-right: 1.5rem;
  flex: 1;
  @media (max-width: 700px) {
    margin: auto;
    margin-left: .5rem;
    padding: 0;
    padding-right: .5rem;
    font-size: 1.5rem;
  }
`;

const Select = styled.select`
  flex: 2;
  text-align: center;
  font-size: 1.5rem;
  height: 3rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 5px #273136;
  @media (max-width: 700px) {
    margin: 0;
    margin-right: 0.5rem;
    padding: 0;
    padding-left: 0.5rem;
  }
`;

const TinyInstructions = styled.div`
font-size: 1rem;
margin-top: .5rem;
@media (max-width: 700px) {
    position: relative;
    top: 6.5rem;
    padding: 0;
  }
`;
