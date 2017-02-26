// @flow

import { List, Record, Map } from 'immutable';

import type Player from './Player';

export default class Match extends Record({
  status: 'open',
  allowSpectators: true,
  time: null,
  players: new Map(),
  playerSkulls: (new List()).setSize(100).map(() => null),
  queues: new Map(),
  id: '',
  password: null,
  name: '',
}) {
  status: 'open' | 'started' | 'finished';
  allowSpectators: boolean;
  time: ?number;
  players: Map<string, Player>;
  playerSkulls: List<number>;
  queues: Map<string, List<number>>;
  id: string;
  password: string;
  name: string;
}
