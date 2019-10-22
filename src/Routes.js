import React from 'react';
import { Router } from '@reach/router';
import { Profile, Logout, ShortenerContainer, Redirect, Auth, DoNotUse } from './components';

function Routes(props) {
  return (
    <Router>
      <ShortenerContainer path='/' default />
      <Profile path='/profile' />
      <Auth path='/auth' />
      <Logout path='/logout' />
      <Redirect path='/:slug' />
      <DoNotUse path="/do-not-use-logout" />
    </Router>
  )
};

export default Routes;
