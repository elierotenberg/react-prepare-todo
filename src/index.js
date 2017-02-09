import createApp from 'koa';
import bodyParser from 'koa-bodyparser';

import createAPIRouter from './api';

const db = {
  users: {},
};

const apiRouter = createAPIRouter(db);
const app = createApp()
  .use(bodyParser())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

app.listen(80);
