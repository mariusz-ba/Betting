import { TYPES } from './events.constants';

const INITIAL_STATE = {
  isFetching: false,
  events: null,
  errors: null
}

export default function reducer(stat = INITIAL_STATE, action) {
  switch(action.type) {
    case TYPES.REQUEST_EVENT:
    case TYPES.REQUEST_EVENTS:
      return { ...state, isFetching: true, errors: null };
    case TYPES.RECEIVE_EVENT:
      return { 
        ...state,
        events: {
          ...state.events,
          [action.payload.id]: action.payload
        }
      };
    case TYPES.RECEIVE_EVENTS:
      return { ...state, events: [...state.events, ...mapKeys(action.payload, 'id')] };
    case TYPES.CLEAR_EVENTS: 
      return { ...state, events: null };
    case TYPES.SET_ERRORS:
      return { ...state, errors: action.payload }
  }
}