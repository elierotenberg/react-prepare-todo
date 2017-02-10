import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from './reducers';
const BROWSER = typeof window === 'object';

export default (initialState) => createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunk,
    promise,
    ...(BROWSER ? [createLogger()] : []),
  ),
);
