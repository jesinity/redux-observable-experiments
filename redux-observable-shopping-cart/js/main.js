import "babel-polyfill"

import 'rxjs';
import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactRedux } from 'react-redux';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './epics';
const epicMiddleware = createEpicMiddleware(rootEpic);
import * as actions from './actions';

import { root } from './reducers';

/**
 * this is the Redux state store.
 */
const store = createStore(
  root,
  applyMiddleware(epicMiddleware)
);

store.dispatch(actions.getAllProducts());


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
