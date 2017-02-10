import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import prepare from 'react-prepare';
import Router from 'koa-router';

import createStore from './store';
import App from './components/App';

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html')).toString('utf8'); // eslint-disable-line no-sync
const clientBundle = fs.readFileSync(path.join(__dirname, 'public', 'c.min.js')).toString('utf8'); // eslint-disable-line no-sync, max-len
const clientBundleMap = fs.readFileSync(path.join(__dirname, 'public', 'c.min.js.map')).toString('utf8'); // eslint-disable-line no-sync, max-len

export default () => new Router()
  .get('/c.min.js', function* getClientBundle(next) {
    this.body = clientBundle;
    yield next;
  })
  .get('/c.min.js.map', function* getClientBundle(next) {
    this.body = clientBundleMap;
    yield next;
  })
  .get('/', function* getIndex(next) {
    const store = createStore({
      fetchData: {},
    });
    const app = <Provider store={store}>
      <App />
    </Provider>;
    yield prepare(app);
    const appHtml = renderToString(app);
    const appState = store.getState();
    this.body = htmlTemplate
      .replace('{{__TITLE__}}', 'react-prepare todo')
      .replace('{{__HTML__}}', appHtml)
      .replace('{{__REDUX_STORE_ENCODED_PAYLOAD__}}', new Buffer(JSON.stringify(appState)).toString('base64'));
    yield next;
  });
