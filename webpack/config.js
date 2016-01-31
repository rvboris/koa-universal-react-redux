import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import path from 'path';
import { noop, mapValues } from 'lodash';

import env from '../src/shared/env';
import stats from './stats';

process.env.BABEL_ENV = 'browser';

const root = path.resolve(__dirname, '..');

let entry = {};
const loaders = [];

const pkg = require('../package.json');

const deps = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
];

entry.common = [
  ...deps.filter(depName => depName.startsWith('react') || depName.startsWith('redux')),
  'reselect',
  'immutable',
  'axios',
  'history',
];

entry.app = [path.join(root, 'src', 'client', 'app.js')];

loaders.push({ test: /\.js?$/, loader: 'if-loader' });

loaders.push({
  test: /\.js?$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    env: {
      browser: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: env === 'development' ? [
          [
            'react-transform',
            {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react'],
                },
              ],
            },
          ],
        ] : [],
      },
    },
  },
});

if (env === 'development') {
  entry = mapValues(entry, item => {
    item.unshift('webpack-hot-middleware/client');
    return item;
  });

  loaders.push({ loader: 'webpack-module-hot-accept' });
} else {
  entry.common = entry.common.filter(item => item.indexOf('devtools') < 0);
}

module.exports = {
  'if-loader': `browser-${env}`,
  devtool: env === 'development' ? 'source-map' : undefined,
  entry,
  output: {
    path: path.join(root, 'build', 'client'),
    publicPath: path.sep,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders,
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
    new ProgressBarPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    env === 'development' ? new webpack.HotModuleReplacementPlugin() : noop,
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    env === 'development' ? noop :
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true,
      },
      output: {
        comments: false,
      },
    }),
    function writeStats() {
      this.plugin('done', stats);
    },
  ],
  eslint: {
    configFile: '.eslintrc',
  },
};
