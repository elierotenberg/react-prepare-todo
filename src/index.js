import 'source-map-support/register';
import createApp from 'koa';
import bodyParser from 'koa-bodyparser';

import createAPIRouter from './createAPIRouter';
import createRenderRouter from './createRenderRouter';
import { address } from './address';

const db = {
  users: {
    'Frank N. Furter': {
      items: [
        'Jump to the left',
        'Do the time warp again',
      ],
    },
    'Dr Scott': {
      items: [],
    },
  },
};

const apiRouter = createAPIRouter(db);
const renderRouter = createRenderRouter();

const app = createApp()
  .use(bodyParser())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(renderRouter.routes())
  .use(renderRouter.allowedMethods());

const server = app.listen(80, '127.0.0.1', () => {
  const { address: host, port } = server.address();
  address.protocol = 'http';
  address.host = host;
  address.port = port;
});
