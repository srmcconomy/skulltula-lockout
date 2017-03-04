// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { List } from 'immutable';

import QueueItem from './QueueItem';
import claimSkull from '../actions/match/claimSkull';

import type Player from '../types/Player';


type Props = {
  queue: List<number>,
  self: Player,
  claimSkull: typeof claimSkull,
};

class Queue extends Component {
  props: Props;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e: KeyboardEvent) => {
    const { queue, self } = this.props;
    if (e.keyCode === 32 && queue.size > 0 && self.matchID) {
      this.props.claimSkull(queue.get(0), self.id, self.matchID);
    }
  }

  render() {
    const { queue } = this.props;
    const queueElements = queue.map(
      (skullID, index) => ({ skullID, index }),
    ).sort(
      ({ skullID: skullID1 }, { skullID: skullID2 }) => skullID1 - skullID2,
    ).map(({ skullID, index }) => (
      <QueueItem
        skullID={skullID}
        index={index}
        key={skullID}
      />
    ));
    return (
      <div className="queue">
        {queueElements}
      </div>
    );
  }
}

export default connect(
  state => ({
    self: state.self,
    queue: state.matches.get(state.self.matchID).queues.get(state.self.id),
  }),
  { claimSkull },
)(Queue);
