import { TYPES } from './users.constants';
import mapKeys from 'lodash/mapKeys';

const INITIAL_STATE = {
  isFetching: false,
  users: {},
  errors: null
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TYPES.REQUEST_USER:
    case TYPES.REQUEST_USERS:
      return { ...state, isFetching: true, errors: null };
    case TYPES.RECEIVE_USER:
      return { 
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload
        }
      };
    case TYPES.RECEIVE_USERS:
      return { ...state, users: {...state.users, ...mapKeys(action.payload, 'id')} };
    case TYPES.CLEAR_USERS: 
      return { ...state, users: {} };
    case TYPES.SET_ERRORS:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}