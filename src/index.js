import 'source-map-support/register';
import createApp from 'koa';
import bodyParser from 'koa-bodyparser';

import createAPIRouter from './createAPIRouter';
import createRenderRouter from './createRenderRouter';

const db = {
  users: {},
};

const apiRouter = createAPIRouter(db);
const renderRouter = createRenderRouter();

const app = createApp()
  .use(bodyParser())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(renderRouter.routes())
  .use(renderRouter.allowedMethods());

app.listen(80);
