import Koa from 'koa';
import logger from './utils/logger';
import { config } from '../shared/env';
import * as middlewares from './middlewares';

const app = new Koa();

app.use(middlewares.errorHandler);
app.use(middlewares.body);
app.use(middlewares.router);
app.use(middlewares.assets);
app.use(middlewares.renderer);
app.use(middlewares.etag);
app.use(middlewares.helmet);
app.use(middlewares.responseTime);

app.listen(config.port, () => logger.info(`app is started on port ${config.port}`));
