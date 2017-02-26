// @flow

import io from 'socket.io-client';

import type { Action } from '../actions';

export default function (store) {
  const socket = io();

  socket.on('dispatch', (action: Action) => {
    store.dispatch({ ...action, origin: 'server' });
  });

  store.actionSubscribe((action: Action) => {
    switch (action.type) {
      case 'create-and-join-match': case 'add-player-and-join':
        socket.emit('init', { playerID: action.playerID, matchID: action.matchID });
        break;
      case 'watch-match':
        socket.emit('init', { playerID: null, matchID: action.matchID });
        break;
      default:
        break;
    }

    if (action.origin !== 'server' && action.scope !== 'client') {
      socket.emit('dispatch', action);
    }
  });

  const state = store.getState();

  if (state.self) {
    const { matchID, id: playerID } = state.self;
    if (matchID && playerID) {
      socket.emit('init', { matchID, playerID });
    }
  }
}
