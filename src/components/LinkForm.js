import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { toast } from 'react-toastify';
import { useStateValue } from '../state';
import { BACKEND_APP_URL, FRONTEND_APP_URL } from '../lib/endpoints';
import { reservedNames } from '../lib/reservedNames';
import Label from './styles/Label';
import NiceInput from './styles/NiceInput';
axios.defaults.withCredentials = true;

function LinkForm(props) {
  const [slug, setSlug] = useState('');
  const [redirect, setRedirect] = useState('');
  const [expiration, setExpiration] = useState(720);
  const [{ error, user }, dispatch] = useStateValue();
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
          position: toast.POSITION.TOP_CENTER,
          toastId: urlToastId,
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

    let modifiedRedirect = null;
    if (error) {
      setError('');
    }
    
    if (redirect.substr(0, 4) !== 'http') {
    }
    // check if URL input is a valid url
    if (!isValidUrl(redirect)) {
      // if not valid, first check if attempted silent auth
      if (redirect === 'admin') {
        setError('');
        silentAuth();
        return;
      }
      // if not silent auth, check if adding "http://" makes it valied
      if (isValidUrl(`http://${redirect}`)) {
        // user forgot to add http:// to the UR
        modifiedRedirect = `http://${redirect}`;
      } else {
        // this URL is NOT valid
        if (!toast.isActive(urlToastId)) {
          toast.warn('🚫 URL not valid', {
            position: toast.POSITION.TOP_CENTER,
            toastId: urlToastId,
          })
        }
        setError('URL not valid');
        return;
      }
    }
    if (!isNameValid(slug)) return;
    setError('');
    const newRedirect = {
      slug,
      redirect: modifiedRedirect || redirect,
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
          position: toast.POSITION.TOP_CENTER,
          toastId: slugToastId,
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
        <FormContainer>
          <Group>
            <Label htmlFor="url">URL to shorten</Label>
            <NiceInput
              error={error === 'URL not valid'}
              type="textarea"
              name="url"
              value={redirect}
              onChange={(e, data) => setRedirect(e.target.value)}
              placeholder="https://..."
            />
          </Group>
          <Group>
            <Label htmlFor="slug">Customize it!</Label>
            <SlugSpan>
              <SlugText>
                adumb.dev/
              </SlugText>
              <SlugInput
                error={error === 'custom name taken'}
                type="textarea"
                name="slug"
                value={slug}
                onChange={(e, data) => setSlug(e.target.value)}
                placeholder="random"
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


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 700px) {
    width: 95vw;
    /* margin: auto; */
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
    width: 95vw;
    border: none;
    margin-top: 2rem;
    padding: 1rem;
    /* margin: 2rem; */
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
    width: 100vw;
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
`;

const Group = styled.div`
  margin: 1rem 0 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const GroupSelect = styled.div`
  margin: 1rem 0 1.5rem 0;
  flex: 1;
  display: flex;
  flex-direction: row;
  text-align: left;
`;

const SelectLabel = styled.label`
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
  font-size: 2.5rem;
  margin-right: 1.5rem;
  flex: 1;
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
`;
