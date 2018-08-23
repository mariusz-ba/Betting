import { TYPES } from './bets.constants';
import mapKeys from 'lodash/mapKeys';

const INITIAL_STATE = {
  isFetching: false,
  bets: {},
  errors: null
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TYPES.REQUEST_BET:
    case TYPES.REQUEST_BETS:
      return { ...state, isFetching: true, errors: null };
    case TYPES.RECEIVE_BET:
      return { 
        ...state,
        bets: {
          ...state.bets,
          [action.payload.id]: action.payload
        }
      };
    case TYPES.RECEIVE_BETS:
      return { ...state, bets: {...state.bets, ...mapKeys(action.payload, 'id')} };
    case TYPES.CLEAR_BETS: 
      return { ...state, bets: {} };
    case TYPES.SET_ERRORS:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}