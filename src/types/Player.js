// @flow

import { Record } from 'immutable';

import type { Colour } from './Colour';

export default class Player extends new Record({ name: '', colour: 'red', matchID: '', id: '' }) {
  name: string;
  colour: Colour;
  matchID: ?string;
  id: string;

  constructor(name: string, colour: Colour, id: string, matchID: string) {
    super({ name, colour, id, matchID });
  }
}
