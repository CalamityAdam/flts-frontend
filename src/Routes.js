import React from 'react';
import { Router } from '@reach/router';
import styled, { css } from 'styled-components';
import { 
  Profile,
  Logout,
  ShortenerContainer,
  Auth,
  DoNotUse,
} from './components';
import { useStateValue } from './state';

const Wrapper = styled.div`
  flex: 1;
  ${props => props.sticky && css`
    padding-top: 62px;
  `}
`;

function Routes(props) {
  const [{ stickyNavbar, user }] = useStateValue();
  const loggedIn = !!user.id;
  return (
    <Wrapper sticky={stickyNavbar}>
      <Router>
        <ShortenerContainer path='/' default />
        {loggedIn && <Profile path='/profile' />}
        <Auth path='/auth' />
        <Logout path='/logout' />
        <DoNotUse path="/do-not-use-logout" />
      </Router>
    </Wrapper>
  )
};

export default Routes;
