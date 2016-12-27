// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';

class Queue extends PureComponent {
  render() {
    const { playerID } = this.props;
    const queue = this.props.queues.get(playerID);
    const queueElements = queue.map(
      (skullID, index) => ({ skullID, index })
    ).sort(
      ({ skullID: skullID1 }, { skullID: skullID2 }) => skullID1 < skullID2
    ).map(({ skullID, index }) => (
      <QueueItem
        skullID={skullID}
        playerID={playerID}
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
  state => ({ queues: state.queues }),
)(Queue);
