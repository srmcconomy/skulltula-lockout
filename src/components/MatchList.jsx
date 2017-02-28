// @flow

import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, { Component } from 'react';

import type { Map } from 'immutable';

import ScrollArea from './ScrollArea';

import type Match from '../types/Match';
import type Player from '../types/Player';

type Props = {
  self: ?Player,
  matches: Map<string, Match>,
  onJoinClick: (matchID: string) => void,
};

class MatchList extends Component {
  props: Props;

  render() {
    const { self, matches } = this.props;
    const matchesElems = matches.keySeq().map(key => {
      let joinButton;
      if (self && self.matchID && self.id) {
        joinButton = <Link className="primary" to={`/match/${self.matchID}`}>Rejoin Match</Link>;
      } else {
        joinButton = (
          <button className="primary" onClick={() => this.props.onJoinClick(key)}>
            Join Match
          </button>
        );
      }
      return (
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
            {joinButton}
            <Link to={`/watch/${key}`}>Watch Match</Link>
          </div>
        </div>
      );
    });
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
  state => ({ self: state.self, matches: state.matches }),
)(MatchList);
