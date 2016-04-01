import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { push } from 'react-router-redux';
import createLocation from 'history/lib/createLocation';
import React from 'react';

import store from '../store';
import routes from '../../shared/routes';
import fetcher from '../utils/fetcher';
import ServerLayout from '../components/ServerLayout';
import logger from '../utils/logger';
import env from '../../shared/env';

const runRouter = (location, routes) =>
  new Promise((resolve) =>
    match({ routes, location }, (...args) => resolve(args)));

export default async(ctx) => {
  const location = createLocation(ctx.request.url);

  const [err, redirect, renderProps] = await runRouter(location, routes);

  if (err || redirect) {
    logger.error(err);

    ctx.status = 500;
    ctx.body = 'Internal server error';

    return;
  }

  if (!renderProps) {
    ctx.status = 404;
    ctx.body = 'Not found';

    return;
  }

  const initialView = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  let assets;

  if (env === 'development') {
    assets = require('../../../build/server/webpack-stats.json');
  } else {
    assets = require('../webpack-stats.json');
  }

  store.dispatch(push(ctx.request.url));

  await fetcher(store.dispatch, renderProps.components, renderProps.params);

  const layoutProps = {
    initialState: store.getState(),
    body: renderToString(initialView),
    assets,
    locale: 'en',
    title: 'koa-universal-react-redux',
    description: 'koa-universal-react-redux',
  };

  ctx.body = `<!DOCTYPE html>${renderToString(<ServerLayout { ...layoutProps } />)}`;
};
