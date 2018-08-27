import React from 'react';
import { render } from 'react-dom';
import App from './app';

import { Provider } from 'react-redux';
import store from './store';

import jwt from 'jsonwebtoken';
import setAuthorizationToken from './services/session/setAuthorizationToken';
import { setCurrentUser } from './services/session/session.actions';
import { fetchUser } from './services/users/users.actions';

const token = localStorage.getItem('jwtToken');
if(token) {
  setAuthorizationToken(token);
  const user = jwt.decode(token).data;
  store.dispatch(setCurrentUser(user));
  store.dispatch(fetchUser(user._id));
}

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);