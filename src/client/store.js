import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './services';

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)