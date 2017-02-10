import url from 'url';
import fetch from 'isomorphic-fetch';

import { FETCH_CLEAR, FETCH_STARTED, FETCH_FAILED, FETCH_SUCCEDED } from './constants';
import { address } from './address';

export const fetchInto = (pathname, into, { forceFetch = false, ...otherOpts } = { forceFetch: false }) =>
  async (dispatch, getState) => {
    const { fetchData } = getState();
    if(fetchData[pathname] && !forceFetch) {
      return;
    }
    dispatch({
      type: FETCH_STARTED,
      payload: {
        into,
      },
    });
    const href = url.format(Object.assign({}, address, { pathname }));
    try {
      const res = await fetch(href, otherOpts);
      if(res.status < 200 || res.status >= 300) {
        dispatch({
          type: FETCH_FAILED,
          payload: {
            into,
            statusCode: res.status,
            err: await res.text(),
          },
        });
        return;
      }
      dispatch({
        type: FETCH_SUCCEDED,
        payload: {
          into,
          value: await res.json(),
        },
      });
    }
    catch(err) {
      dispatch({
        type: FETCH_FAILED,
        payload: {
          into,
          statusCode: null,
          err,
        },
      });
    }
  }
;

export const clearFetch = (into) => ({
  type: FETCH_CLEAR,
  payload: {
    into,
  },
});
