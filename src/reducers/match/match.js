// @flow

import Match from '../../types/Match';
import type { Action } from '../../actions';
import playersReducer, { playersStateFromJSON } from './players';
import playerSkullsReducer, { playerSkullsStateFromJSON } from './playerSkulls';
import queuesReducer, { queuesStateFromJSON } from '../player/queues';

import type { PlayersStateJSON } from './players';
import type { PlayerSkullsStateJSON } from './playerSkulls';
import type { QueuesStateJSON } from '../player/queues';

export type MatchStateJSON = {
  players: PlayersStateJSON,
  playerSkulls: PlayerSkullsStateJSON,
  queues: QueuesStateJSON,
  id: string,
  name: string,
  allowSpectators: boolean,
};

export default function (state: Match = new Match(), action: Action) {
  if (action.matchID == undefined || action.matchID !== state.id) {
    return state;
  }
  switch (action.type) {
    case 'start-match':
      return state.set('time', Date.now()).set('status', 'started');
    default:
      return state.merge({
        players: playersReducer(state.players, action),
        playerSkulls: playerSkullsReducer(state.playerSkulls, action),
        queues: queuesReducer(state.queues, action),
      });
  }
}

export function matchStateFromJSON(obj: MatchStateJSON) {
  return new Match({
    name: obj.name,
    allowSpectators: obj.allowSpectators,
    players: playersStateFromJSON(obj.players),
    playerSkulls: playerSkullsStateFromJSON(obj.playerSkulls),
    queues: queuesStateFromJSON(obj.queues),
    id: obj.id,
  });
}
