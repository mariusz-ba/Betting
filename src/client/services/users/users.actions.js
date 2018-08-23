import { TYPES } from './users.constants';
import { User } from './users.model';
import axios from 'axios';

// Action creators
export const requestUser = (id) => ({
  type: TYPES.REQUEST_USER,
  payload: id
})

export const requestUsers = (filter = {}) => ({
  type: TYPES.REQUEST_USERS,
  payload: filter
})

export const receiveUser = (user) => ({
  type: TYPES.RECEIVE_USER,
  payload: user
})

export const receiveUsers = (users) => ({
  type: TYPES.RECEIVE_USERS,
  payload: users
})

export const setErrors = (errors) => ({
  type: TYPES.SET_ERRORS,
  payload: errors
})

export const clearUsers = () => ({
  type: TYPES.CLEAR_USERS
})

// Thunks
export const fetchUser = (id) => {
  return async dispatch => {
    dispatch(requestUser(id));
    try {
      const res = await axios.get(`/api/users/${id}`);
      const data = res.data;
      const user = new User({ id: data._id, ...data });
      dispatch(receiveUser(user));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}

export const fetchUsers = (filter = {}) => {
  return async dispatch => {
    dispatch(requestUsers(filter));
    try {
      const res = await axios.get('/api/users', { params: filter });
      const data = res.data;
      const users = 
        Array.isArray(data) ?
        data.map(item => new User({ id: item._id, ...item })) : [];
      dispatch(receiveUsers(users));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}