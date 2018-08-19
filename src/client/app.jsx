import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './screens/home/home';
import SignIn from './screens/authentication/screens/signin/signin';
import SignUp from './screens/authentication/screens/signup/signup';

import './app.scss';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  )
}