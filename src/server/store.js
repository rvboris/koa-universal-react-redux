import { combineReducers } from 'redux-immutablejs';
import { createStore, applyMiddleware, compose } from 'redux';
import optimistPromiseMiddleware from 'redux-optimist-promise';
import { routerReducer } from 'react-router-redux';
import Immutable from 'immutable';

import * as reducers from '../shared/reducers';
import env from '../shared/env';
import DevTools from '../shared/containers/DevTools';

const middlewares = [
  optimistPromiseMiddleware(),
];

const storeEnchancers = [
  applyMiddleware(...middlewares),
];

if (env === 'development') {
  storeEnchancers.push(DevTools.instrument());
}

const reducer = combineReducers(reducers, { routing: routerReducer });
const store = createStore(reducer, Immutable.Map({}), compose(...storeEnchancers));

export default store;
