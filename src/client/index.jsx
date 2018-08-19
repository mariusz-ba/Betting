import React from 'react';
import { render } from 'react-dom';
import App from './app';

import { Provider } from 'react-redux';
import store from './store';

import jwt from 'jsonwebtoken';
import setAuthorizationToken from './services/session/setAuthorizationToken';
import { setCurrentUser } from './services/session/session.actions';

const token = localStorage.getItem('jwtToken');
if(token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token).data));
}

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);