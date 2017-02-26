// @flow

import { createStore } from 'redux';
import { List } from 'immutable';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import type EventEmitter from 'events';
import { Router, browserHistory } from 'react-router';

import { clientReducers, stateFromJSON } from './reducers';
import App from './components/App';
import Player from './types/Player';
import initSockets from './util/clientSockets';
import storeListenerEnhancer from './util/storeListenerEnhancer';
import routes from './util/routes';

const initialState = stateFromJSON(document.INITIAL_STATE);
const enhancedCreateStore = storeListenerEnhancer(createStore);

const store = enhancedCreateStore(clientReducers, initialState);
initSockets(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store, () => store.getState().self)} />
  </Provider>,
  document.getElementById('root'),
);
