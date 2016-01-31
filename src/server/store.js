import { combineReducers } from 'redux-immutablejs';
import { createStore, applyMiddleware, compose } from 'redux';
import optimistPromiseMiddleware from 'redux-optimist-promise';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createMemoryHistory } from 'react-router';
import Immutable from 'immutable';

import * as reducers from '../shared/reducers';
import env from '../shared/env';

const DevTools = require('../shared/containers/DevTools').default;

const middlewares = [
  optimistPromiseMiddleware(),
  syncHistory(createMemoryHistory()),
];

const storeEnchancers = [
  applyMiddleware(...middlewares),
];

if (env === 'development') {
  storeEnchancers.push(DevTools.instrument());
}

const reducer = combineReducers(reducers, { routing: routeReducer });
const store = createStore(reducer, Immutable.Map({}), compose(...storeEnchancers));

export default store;
