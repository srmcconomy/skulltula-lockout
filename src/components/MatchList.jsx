// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ScrollArea from './ScrollArea';

type Props = {
  onJoinClick: (matchID: string) => void,
};

class MatchList extends Component {
  props: Props;

  render() {
    const { matches } = this.props;
    const matchesElems = matches.keySeq().map(key => (
      <div className="match-item" key={key}>
        <div className="name">
          {matches.get(key).name}
        </div>
        <div className="entrants-container">
          <div className="entrants">
            {matches.get(key).players.valueSeq().map(player => (
              <div className="entrant" key={player.id}>
                <div className={`colour ${player.colour}`} />
                <div className="player-name">{player.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-column">
          <button className="primary" onClick={() => this.props.onJoinClick(key)}>
            Join Match
          </button>
          <Link to={`/watch/${key}`}>Watch Match</Link>
        </div>
      </div>
    ));
    return (
      <div className="match-list">
        <ScrollArea>
          {matchesElems}
        </ScrollArea>
      </div>
    );
  }
}

export default connect(
  state => ({ matches: state.matches }),
)(MatchList);
