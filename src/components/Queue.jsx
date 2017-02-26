// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { List } from 'immutable';

import QueueItem from './QueueItem';


type Props = {
  queue: List<number>,
}

class Queue extends Component {
  props: Props;

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
  state => ({ queue: state.matches.get(state.self.matchID).queues.get(state.self.id) }),
)(Queue);
