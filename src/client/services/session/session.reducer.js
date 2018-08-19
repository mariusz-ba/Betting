import { TYPES } from './session.constants';
import isEmpty from 'lodash/isEmpty';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  errors: null
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TYPES.REQUEST_SIGNIN:
      return { ...state, isFetching: true };
    case TYPES.SET_CURRENT_USER:
      return { 
        ...state, 
        isFetching: false,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: null
      };
    case TYPES.SET_SESSION_ERRORS:
      return { ...state, isFetching: false, errors: action.payload };
    case TYPES.SIGNOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}