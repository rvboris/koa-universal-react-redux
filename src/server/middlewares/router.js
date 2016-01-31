import Router from 'koa-66';
import { each } from 'lodash';
import * as routes from '../api';

const mainRouter = new Router();

each(routes, (route, routeName) => {
  mainRouter.mount(`/api/${routeName}`, route);
});

export default mainRouter.routes();
