import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { combineReducers } from 'redux-immutablejs';
import optimistPromiseMiddleware from 'redux-optimist-promise';
import Immutable from 'immutable';

import * as reducers from '../shared/reducers';

/* #if browser-development */
const persistState = require('redux-devtools').persistState;
const DevTools = require('../shared/containers/DevTools').default;
/* #end */

const initialState = Immutable.fromJS(window.__INITIAL_STATE__);
const reducer = combineReducers(Object.assign({}, reducers, { routing: routerReducer }));

const middlewares = [
  routerMiddleware(browserHistory),
  optimistPromiseMiddleware(),
];

const storeEnchancers = [
  applyMiddleware(...middlewares),
];

/* #if browser-development */
storeEnchancers.push(DevTools.instrument());
storeEnchancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
/* #end */

const store = createStore(reducer, initialState, compose(...storeEnchancers));

if (module.hot) {
  module.hot.accept('../shared/reducers', () => store.replaceReducer(reducers.default));
}

export default store;
export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.toJS().routing,
});
