// @flow

import { createStore } from 'redux';
import { List } from 'immutable';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import type EventEmitter from 'events';

import { clientReducers } from './reducers';
import App from './components/App';
import Player from './types/Player';

const store = createStore(clientReducers);
store.dispatch({
  type: 'add-player',
  player: new Player('test', 'red'),
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
