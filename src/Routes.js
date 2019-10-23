import React from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { Profile, Logout, ShortenerContainer, Redirect, Auth, DoNotUse } from './components';

const Wrapper = styled.div`
  flex: 1;
`;

function Routes(props) {
  return (
    <Wrapper>
      <Router>
          <ShortenerContainer path='/' default />
          <Profile path='/profile' />
          <Auth path='/auth' />
          <Logout path='/logout' />
          <Redirect path='/:slug' />
          <DoNotUse path="/do-not-use-logout" />
      </Router>
    </Wrapper>
  )
};

export default Routes;
