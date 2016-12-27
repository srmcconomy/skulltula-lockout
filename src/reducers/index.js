// @flow

import { combineReducers } from 'redux';

import hoveredArea from './client/hoveredArea';
import openedArea from './client/openedArea';
import players from './match/players';
import playerSkulls from './match/playerSkulls';
import queues from './match/queues';

export const clientReducers = combineReducers({
  hoveredArea,
  openedArea,
  players,
  playerSkulls,
  queues,
});

export const serverReducers = {};
