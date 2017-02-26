// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import type { List } from 'immutable';
import type Player from '../types/Player';

type Props = {
  playerSkulls: List<number>,
  players: List<Player>,
}

class Scoreboard extends PureComponent {
  props: Props;

  render() {
    const { playerSkulls, players } = this.props;
    let playerScores = players.map(() => 0);
    playerSkulls.forEach(player => {
      if (player) playerScores = playerScores.update(player, s => s + 1);
    });
    const total = playerScores.reduce((t, s) => t + s);
    const entries = playerScores.map((score, playerID) => (
      <div
        className="score-entry flex-row"
        key={playerID}
      >
        <div
          className={`colour ${players.get(playerID).colour}`}
        />
        <span className="name">
          {players.get(playerID).name}
        </span>
        <span className="score">
          {score}
        </span>
      </div>
    ));
    return (
      <div className={`scoreboard${this.props.abs ? ' abs' : ''}`}>
        <div className="entries">
          {entries}
        </div>
        <div className="stats">
          <div className="score-entry flex-row">
            <div
              className="colour remaining"
            />
            <span className="name">Remaining</span>
            <span className="score">{100 - total}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    playerSkulls: state.matches.get(state.self.matchID).playerSkulls,
    players: state.matches.get(state.self.matchID).players,
  }),
)(Scoreboard);
