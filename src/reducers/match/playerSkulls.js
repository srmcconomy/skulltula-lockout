// @flow

import { List } from 'immutable';

import type { Action } from '../../actions';

const defaultState = (new List()).setSize(100).map(() => null);

export default function (state: List<?number> = defaultState, action: Action) {
  switch (action.type) {
    case 'claim-skull':
      if (action.origin === 'server' || state.get(action.skullID) === null) {
        return state.set(action.skullID, action.playerID);
      }
      return state;
    case 'unclaim-skull':
      if (action.origin === 'server' || state.get(action.skullID) === action.playerID) {
        return state.set(action.skullID, null);
      }
      return state;
    default:
      return state;
  }
}

export type PlayerSkullsStateJSON = Array<?number>;

export function playerSkullsStateFromJSON(obj: PlayerSkullsStateJSON) {
  return new List(obj);
}
