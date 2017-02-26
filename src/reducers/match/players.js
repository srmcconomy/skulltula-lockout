import { Map } from 'immutable';

import type { Action } from '../../actions';
import Player from '../../types/Player';
import type { Colour } from '../../types/Colour';

export default function (
  state: Map<string, Player> = new Map(),
  action: Action,
) {
  switch (action.type) {
    case 'add-player': case 'add-player-and-join':
      return state.set(action.playerID, new Player(
        action.playerName,
        action.colour,
        action.playerID,
        action.matchID,
      ));
    default:
      return state;
  }
}

export type PlayersStateJSON = { [key: string]: { name: string, colour: Colour } };

export function playersStateFromJSON(
  obj: PlayersStateJSON,
) {
  return new Map(Object.keys(obj).map(key => {
    const { name, colour, id, matchID } = obj[key];
    return [key, new Player(name, colour, id, matchID)];
  }));
}
