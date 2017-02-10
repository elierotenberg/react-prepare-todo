import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';
import App from './components/App';

const initialState = window.__REDUX_STORE_PAYLOAD__;
const store = createStore(initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
