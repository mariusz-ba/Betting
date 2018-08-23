import { TYPES } from './bets.constants';
import { Bet } from './bets.model';
import axios from 'axios';

// Action creators
export const requestBet = (id) => ({
  type: TYPES.REQUEST_BET,
  payload: id
})

export const requestBets = (filter = {}) => ({
  type: TYPES.REQUEST_BETS,
  payload: filter
})

export const receiveBet = (bet) => ({
  type: TYPES.RECEIVE_BET,
  payload: bet
})

export const receiveBets = (bets) => ({
  type: TYPES.RECEIVE_BETS,
  payload: bets
})

export const setErrors = (errors) => ({
  type: TYPES.SET_ERRORS,
  payload: errors
})

export const clearBets = () => ({
  type: TYPES.CLEAR_BETS
})

// Thunks
export const fetchBet = (id) => {
  return async dispatch => {
    dispatch(requestBet(id));
    try {
      const res = await axios.get(`/api/bets/${id}`);
      const data = res.data;
      const bet = new Bet({ id: data._id, ...data });
      dispatch(receiveBet(bet));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}

export const fetchBets = (filter = {}) => {
  return async dispatch => {
    dispatch(requestBets(filter));
    try {
      const res = await axios.get('/api/bets', { params: filter });
      const data = res.data;
      const bets = 
        Array.isArray(data) ?
        data.map(item => new Bet({ id: item._id, ...item })) : [];
      dispatch(receiveBets(bets));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}

export const createBet = (object) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/bets', object);
      const data = res.data;
      const bet = new Bet({ id: data._id, ...data });
      dispatch(receiveBet(bet));
    } catch (error) {
      dispatch(setErrors(error.response.data));
    }
  }
}