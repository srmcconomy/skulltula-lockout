import { List } from 'immutable';

import type { Action } from '../../actions';
import type Player from '../../types/Player';

export default function (
  state: List<Player> = new List(),
  action: Action,
) {
  switch (action.type) {
    case 'add-player':
      return state.push(action.player);
    default:
      return state;
  }
}
