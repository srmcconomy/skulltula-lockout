// @flow

import { Map } from 'immutable';

import type { Action } from '../../actions';
import Match from '../../types/Match';
import matchReducer, { matchStateFromJSON } from '../match/match';

import type { MatchStateJSON } from '../match/match';

export type MatchesStateJSON = Array<MatchStateJSON>;

export default function (state: Map<string, Match> = new Map(), action: Action) {
  switch (action.type) {
    case 'create-match': case 'create-and-join-match':
      if (action.matchID !== null) {
        let newState = state.set(action.matchID, new Match({
          name: action.name,
          allowSpectators: action.allowSpectators,
          password: action.password,
          id: action.matchID,
        }));
        if (action.playerID && action.playerName && action.colour) {
          newState = newState.set(
            action.matchID,
            matchReducer(
              newState.get(action.matchID),
              {
                type: 'add-player',
                playerName: action.playerName,
                colour: action.colour,
                playerID: action.playerID,
                matchID: action.matchID,
              },
            ),
          );
        }
        return newState;
      }
      return state;
    case 'delete-match':
      return state.delete(action.matchID);
    default:
      if (action.matchID != undefined && state.has(action.matchID)) {
        return state.set(
          action.matchID,
          matchReducer(state.get(action.matchID), action),
        );
      }
      return state;
  }
}

export function matchesStateFromJSON(obj: MatchesStateJSON) {
  return new Map(Object.keys(obj).map(key => [key, matchStateFromJSON(obj[key])]));
}
