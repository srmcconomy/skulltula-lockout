// @flow

import { List } from 'immutable';

import type { Action } from '../../actions';

const defaultState = (new List()).setSize(100).map(() => null);

export default function (state: List<?number> = defaultState, action: Action) {
  switch (action.type) {
    case 'claim-skull':
      return state.set(action.skullID, action.playerID);
    case 'unclaim-skull':
      return state.set(action.skullID, null);
    default:
      return state;
  }
}
