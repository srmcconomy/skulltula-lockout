// @flow

import type { Action } from '../../actions';

export default function (state: ?string = null, action: Action) {
  switch (action.type) {
    case 'open-area':
      return action.area;
    case 'close-area':
      return null;
    default:
      return state;
  }
}
