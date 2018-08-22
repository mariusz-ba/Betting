import { combineReducers } from 'redux';
import { reducer as SessionReducer } from './session';
import { reducer as EventsReducer } from './events';

export default combineReducers({
  session: SessionReducer,
  events: EventsReducer
})