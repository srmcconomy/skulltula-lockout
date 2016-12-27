// @flow

import { List } from 'immutable';

import type { Action } from '../../actions';

export default function (
  state: List<List<number>> = new List(),
  action: Action
) {
  switch (action.type) {
    case 'add-to-bottom-of-queue': {
      const { playerID, skullID } = action;
      return state.update(playerID, l => {
        const i = l.indexOf(skullID);
        if (i === -1) {
          return l.push(skullID);
        }
        if (i === l.size - 1) {
          return l;
        }
        return l.delete(i).push(skullID);
      });
    }
    case 'add-to-top-of-queue': {
      const { skullID } = action;
      return state.update(action.playerID, l => {
        const i = l.indexOf(skullID);
        if (i === 0) {
          return l;
        } else if (i >= 0) {
          return l.delete(i).unshift(skullID);
        }
        return l.unshift(skullID);
      });
    }
    case 'remove-from-queue': {
      const { index, playerID } = action;
      return state.update(playerID, l => l.delete(index));
    }
    case 'move-up-in-queue': {
      const { index, playerID } = action;
      if (index === 0) {
        return state;
      }
      return state.update(
        playerID,
        l => l.set(index - 1, l.get(index)).set(index, l.get(index - 1)),
      );
    }
    case 'move-down-in-queue': {
      const { index, playerID } = action;
      if (index === state.get(action.playerID).size - 1) {
        return state;
      }
      return state.update(
        playerID,
        l => l.set(index + 1, l.get(index)).set(index, l.get(index + 1)),
      );
    }
    case 'claim-skull': {
      const { playerID, skullID } = action;
      return state.update(
        playerID,
        l => {
          const i = l.indexOf(skullID);
          if (i >= 0) {
            return l.delete(i);
          }
          return l;
        }
      );
    }
    case 'add-player': {
      return state.push(new List());
    }
    default:
      return state;
  }
}
