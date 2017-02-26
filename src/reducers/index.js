// @flow

import { combineReducers } from 'redux';

import hoveredArea from './client/hoveredArea';
import openedArea from './client/openedArea';
import self from './client/self';
import matches, { matchesStateFromJSON } from './server/matches';
import Player from '../types/Player';

import type { MatchesStateJSON } from './server/matches';

export const clientReducers = combineReducers({
  hoveredArea,
  openedArea,
  self,
  matches,
});

export const serverReducers = combineReducers({
  matches,
});

export type StateJSON = {
  matches: MatchesStateJSON,
};

export function stateFromJSON(
  obj: {
    self: ?{ name: string, colour: string, id: string, matchID: string },
    matches: MatchesStateJSON,
  },
) {
  return {
    self: obj.self ?
      new Player(obj.self.name, obj.self.colour, obj.self.id, obj.self.matchID) :
      null,
    matches: matchesStateFromJSON(obj.matches),
  };
}
