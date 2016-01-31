import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from '../shared/routes';
import store from './store';

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('body')
);

/* #if browser-development */
const DevTools = require('../shared/containers/DevTools').default;

let debugElm = document.getElementById('debug');

if (!debugElm) {
  debugElm = document.createElement('div');
  document.body.appendChild(debugElm);
}

render(<DevTools store={store} />, debugElm);
/* #end */
