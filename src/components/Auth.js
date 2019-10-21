import React, { useState } from 'react';
import styled from 'styled-components';
import { Login, Signup } from './index';
import FancyButton from './styles/FancyButton';

const FancyText = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

function Auth() {
  const [view, setView] = useState('login')
  
  return (
    <>
      {view === 'login' && (
        <>
          <FancyText>
            Not a member? <FancyButton onClick={() => setView('signup')}>sign up</FancyButton> instead!
          </FancyText>
          <Login />
        </>
      )}
      {view === 'signup' && (
        <>
          <FancyText>
          Already a member? <FancyButton onClick={() => setView('login')}>log in</FancyButton> instead!
          </FancyText>
          <Signup />
        </>
      )}
    </>
  )
}

export default Auth;
