// @flow

import socketio from 'socket.io';
import type { Action } from '../actions';

type ServerAction = Action & { origin: number };

const socketToPlayer = {};

export default function (server, store) {
  const io = socketio(server);

  io.on('connection', socket => {
    socketToPlayer[socket.id] = { playerID: null, matchID: null };
    const dispose = store.actionSubscribe((action: ServerAction, prevState) => {
      if (action.origin === socket.id) {
        switch (action.type) {
          case 'create-match':
            socket.emit('dispatch', {
              type: 'create-and-join-match',
              name: action.name,
              matchID: action.matchID,
              playerName: action.playerName,
              playerID: action.playerID,
              colour: action.colour,
              allowSpectators: action.allowSpectators,
            });
            break;
          case 'add-player':
            socket.emit('dispatch', {
              ...action,
              type: 'add-player-and-join',
            });
            break;
          default:
            break;
        }
      } else {
        const newAction = action;
        switch (action.type) {
          case 'create-match':
            delete newAction.password;
            break;
          default:
            break;
        }
        console.log(socketToPlayer);
        switch (newAction.scope) {
          case 'public':
            if (
              socketToPlayer[socket.id].matchID === null ||
              socketToPlayer[socket.id].matchID === newAction.matchID
            ) {
              socket.emit('dispatch', newAction);
            }
            break;
          case 'match':
            if (socketToPlayer[socket.id].matchID === newAction.matchID) {
              socket.emit('dispatch', newAction);
            }
            break;
          case 'player':
            if (socketToPlayer[socket.id].playerID === newAction.playerID) {
              socket.emit('dispatch', newAction);
            }
            break;
          default:
            break;
        }
      }
    });
    socket.on('dispatch', (action: Action) => {
      const newAction = { ...action, origin: socket.id };
      switch (action.type) {
        case 'create-match':
          newAction.matchID = Math.random().toString(36).substr(2, 5);
          break;
        case 'join-match': {
          if (!store.getState().matches.has(newAction.matchID)) {
            socket.emit('dispatch', { type: 'error', error: 'Match does not exist' });
            return;
          }
          const match = store.getState().matches.get(newAction.matchID);
          if (newAction.password !== match.password) {
            socket.emit('dispatch', { type: 'error', error: 'Invalid Password' });
            return;
          }
          if (match.players.some(player => player.colour === newAction.colour)) {
            socket.emit('dispatch', { type: 'error', error: 'Colour is taken' });
            return;
          }
          if (match.players.some(player => player.name === newAction.playerName)) {
            socket.emit('dispatch', { type: 'error', error: 'Username is taken' });
            return;
          }
          newAction.type = 'add-player';
          newAction.scope = 'public';
          delete newAction.password;
          break;
        }
        case 'attempt-claim-skull': {
          console.log(newAction);
          if (!store.getState().matches.has(newAction.matchID)) {
            break;
          }
          const match = store.getState().matches.get(newAction.matchID);
          console.log(match.toJS())
          if (
            match.players.has(newAction.playerID) &&
            match.playerSkulls.get(newAction.skullID) === null
          ) {
            newAction.type = 'claim-skull';
            newAction.origin = 'server';
          }
          break;
        }
        case 'attempt-unclaim-skull': {
          if (!store.getState().matches.has(newAction.matchID)) {
            break;
          }
          const match = store.getState().matches.get(newAction.matchID);
          if (
            match.players.has(newAction.playerID) &&
            match.playerSkulls.get(newAction.skullID) === newAction.playerID
          ) {
            newAction.type = 'unclaim-skull';
            newAction.origin = 'server';
          }
          break;
        }
        default:
          break;
      }
      store.dispatch(newAction);
    });
    socket.on('init', ({ playerID, matchID }) => {
      console.log(matchID);
      socketToPlayer[socket.id] = { playerID, matchID };
    });
    socket.on('disconnect', () => {
      dispose();
      delete socketToPlayer[socket.id];
    });
  });
}
