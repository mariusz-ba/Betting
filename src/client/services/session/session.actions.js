import { TYPES } from './session.constants';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './setAuthorizationToken';

// Action creators
export const requestSignin = credentials => ({
  type: TYPES.REQUEST_SIGNIN,
  payload: credentials
})

export const setCurrentUser = user => ({
  type: TYPES.SET_CURRENT_USER,
  payload: user
})

export const setSessionErrors = errors => ({
  type: TYPES.SET_SESSION_ERRORS,
  payload: errors
})

export const requestSignout = () => ({
  type: TYPES.SIGNOUT
})

// Thunks
export const signin = credentials => {
  return async dispatch => {
    dispatch(requestSignin(credentials));
    try {
      const res = await axios.post('/api/auth', credentials);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token).data));
      return Promise.resolve();
    } catch (error) {
      dispatch(setSessionErrors(error.response.data.fields));
      return Promise.reject();
    }
  }
}

export const signout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(null);
    dispatch(requestSignout());
  }
}