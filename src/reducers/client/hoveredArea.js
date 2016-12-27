// @flow

import type { Action } from '../../actions';

export default function (state: ?string = null, action: Action) {
  switch (action.type) {
    case 'set-hovered-area':
      return action.area;
    default:
      return state;
  }
}
