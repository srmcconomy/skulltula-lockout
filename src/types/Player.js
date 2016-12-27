// @flow

import { Record } from 'immutable';

import type { Colour } from './Colour';

export default class Player extends new Record({ name: '', colour: 'white' }) {
  name: string;
  colour: Colour;

  constructor(name: string, colour: Colour) {
    super({ name, colour });
  }
}
