import { combineReducers } from 'redux';

import { FETCH_STARTED, FETCH_FAILED, FETCH_SUCCEDED } from './constants';

const assign = (...args) => Object.assign({}, ...args);

const fetchReducer = (state = {}, { type, payload }) => {
  if(type === FETCH_STARTED) {
    const { into } = payload;
    return assign(state, {
      [into]: {
        status: FETCH_STARTED,
      },
    });
  }
  if(type === FETCH_FAILED) {
    const { into, statusCode, err } = payload;
    return assign(state, {
      [into]: {
        status: FETCH_FAILED,
        statusCode,
        err,
      },
    });
  }
  if(type === FETCH_SUCCEDED) {
    const { into, value } = payload;
    return assign(state, {
      [into]: {
        status: FETCH_SUCCEDED,
        value,
      },
    });
  }
  return state;
};

export default combineReducers({
  fetchData: fetchReducer,
});
