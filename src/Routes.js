import React from 'react';
import { Router } from '@reach/router';
import { Links, Logout, ShortenerContainer, Redirect, Auth } from './components';

function Routes(props) {
  return (
    <Router>
      <ShortenerContainer path='/' default />
      <Links path='/links' />
      <Auth path='/auth' />
      <Logout path='/logout' />
      <Redirect path='/:slug' />
    </Router>
  )
};

export default Routes;
