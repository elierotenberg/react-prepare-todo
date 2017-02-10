import { PropTypes } from 'react';

import { FETCH_NOT_STARTED, FETCH_STARTED, FETCH_FAILED, FETCH_SUCCEDED } from './constants';

export default (valueType) => PropTypes.shape({
  status: PropTypes.oneOf([FETCH_NOT_STARTED, FETCH_STARTED, FETCH_FAILED, FETCH_SUCCEDED]),
  err: PropTypes.string,
  value: valueType,
});
