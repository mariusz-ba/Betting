import React from 'react';

import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';

const isAuthenticated = false;

export default () => {
  if(isAuthenticated)
    return <Dashboard/>
  return <Landing/>
}