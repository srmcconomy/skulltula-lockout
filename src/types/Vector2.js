import { Record } from 'immutable';

export default class Vector2 extends new Record({ x: 0, y: 0 }) {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super({ x, y });
  }
}
