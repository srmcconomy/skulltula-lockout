// @flow

import Player from '../../types/Player';

import type { Action } from '../../actions';

export default function (state: ?Player = null, action: Action) {
  switch (action.type) {
    case 'create-and-join-match': case 'add-player-and-join':
      document.cookie = `playerID=${action.playerID}`;
      document.cookie = `matchID=${action.matchID}`;
      return new Player(action.playerName, action.colour, action.playerID, action.matchID);
    case 'watch-match':
      document.cookie = `matchID=${action.matchID}`;
      return new Player(null, null, null, action.matchID);
    default:
      return state;
  }
}
