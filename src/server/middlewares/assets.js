import convert from 'koa-convert';
import compose from 'koa-compose';
import webpack from 'webpack';
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';
import koaWebpackHotMiddleware from 'koa-webpack-hot-middleware';
import staticCache from 'koa-static-cache';
import path from 'path';

import env from '../../shared/env';

let middleware;

if (env === 'development') {
  const compiler = webpack(require(path.join('..', '..', '..', 'webpack', 'config')));

  middleware = convert(
    compose([
      koaWebpackDevMiddleware(compiler, { noInfo: true, publicPath: '/' }),
      koaWebpackHotMiddleware(compiler),
    ])
  );
} else {
  middleware = convert(staticCache(path.resolve(__dirname, '..', '..', 'client'), {
    maxAge: 365 * 24 * 60 * 60,
  }));
}

export default middleware;
