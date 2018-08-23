import { combineReducers } from 'redux';
import { reducer as SessionReducer } from './session';
import { reducer as EventsReducer } from './events';
import { reducer as BetsReducer } from './bets';

export default combineReducers({
  session: SessionReducer,
  events: EventsReducer,
  bets: BetsReducer
})