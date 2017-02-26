// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Match from '../components/Match';
import Watch from '../components/Watch';

export default function (store, getPlayer) {
  function onEnter(state, replace) {
    const player = getPlayer();
    if (
      !player ||
      !store.getState().matches.has(state.params.matchID) ||
      !store.getState().matches.get(state.params.matchID).players.has(player.id) ||
      !player.matchID === state.params.matchID
    ) {
      replace('/');
    }
  }

  function onEnter2(state, replace) {
    if (
      !store.getState().matches.has(state.params.matchID)
    ) {
      replace('/');
      return;
    }
    store.dispatch({ type: 'watch-match', matchID: state.params.matchID });
  }

  return (
    <Route path="/">
      <IndexRoute component={App} />
      <Route path="match/:matchID" onEnter={onEnter} component={Match} />
      <Route path="watch/:matchID" onEnter={onEnter2} component={Watch} />
    </Route>
  );
}
