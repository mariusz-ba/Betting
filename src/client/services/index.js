import { combineReducers } from 'redux';
import { reducer as SessionReducer } from './session';

export default combineReducers({
  session: SessionReducer
})