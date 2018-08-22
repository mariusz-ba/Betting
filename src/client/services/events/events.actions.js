import { TYPES } from './events.constants';
import { Event } from './events.model';
import axios from 'axios';

// Action creators
export const requestEvent = (id) => ({
  type: TYPES.REQUEST_EVENT,
  payload: id
})

export const requestEvents = (filter = {}) => ({
  type: TYPES.REQUEST_EVENTS,
  payload: filter
})

export const receiveEvent = (event) => ({
  type: TYPES.RECEIVE_EVENT,
  payload: event
})

export const receiveEvents = (events) => ({
  type: TYPES.RECEIVE_EVENTS,
  payload: events
})

export const setErrors = (errors) => ({
  type: TYPES.SET_ERRORS,
  payload: errors
})

export const clearEvents = () => ({
  type: TYPES.CLEAR_EVENTS
})

// Thunks
export const fetchEvent = (id) => {
  return async dispatch => {
    dispatch(requestEvent(id));
    try {
      const res = await axios.get(`/api/events/${id}`);
      const data = res.data;
      const event = new Event({ id: data._id, ...data });
      dispatch(receiveEvent(event));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}

export const fetchEvents = (filter = {}) => {
  return async dispatch => {
    dispatch(requestEvents(filter));
    try {
      const res = await axios.get('/api/events', { params: filter });
      const data = res.data;
      const events = 
        Array.isArray(data) ?
        data.map(item => new Event({ id: item._id, ...item })) : [];
      dispatch(receiveEvents(events));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}