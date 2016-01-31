const Router = require('koa-66');

const timeRouter = new Router();

timeRouter.get('/', (ctx) => {
  ctx.body = { time: new Date() };
});

export default timeRouter;
