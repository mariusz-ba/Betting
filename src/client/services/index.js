import { combineReducers } from 'redux';
import { reducer as SessionReducer } from './session';
import { reducer as EventsReducer } from './events';
import { reducer as BetsReducer } from './bets';
import { reducer as UsersReducer } from './users';

export default combineReducers({
  session: SessionReducer,
  events: EventsReducer,
  bets: BetsReducer,
  users: UsersReducer
})