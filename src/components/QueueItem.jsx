// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import areas from '../data/areas';
import claimSkull from '../actions/match/claimSkull';
import moveSkullDownInQueue from '../actions/player/moveSkullDownInQueue';
import moveSkullUpInQueue from '../actions/player/moveSkullUpInQueue';
import removeSkullFromQueue from '../actions/player/removeSkullFromQueue';
import skulltulas from '../data/skulltulas';

type Props = {
  index: number,
  skullID: number,
  playerID: string,
  matchID: string,
  removeSkullFromQueue: typeof removeSkullFromQueue,
  claimSkull: typeof claimSkull,
  moveSkullUpInQueue: typeof moveSkullUpInQueue,
  moveSkullDownInQueue: typeof moveSkullDownInQueue,
}

const QUEUE_ITEM_HEIGHT = 11.2;

class QueueItem extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.index !== this.props.index ||
      nextProps.skullID !== this.props.skullID ||
      nextProps.playerID !== this.props.playerID
    );
  }

  onRemoveClick = () => {
    this.props.removeSkullFromQueue(this.props.index, this.props.playerID, this.props.matchID);
  }

  onClaimClick = () => {
    this.props.claimSkull(this.props.skullID, this.props.playerID, this.props.matchID);
  }

  onMoveUpClick = () => {
    this.props.moveSkullUpInQueue(this.props.index, this.props.playerID, this.props.matchID);
  }

  onMoveDownClick = () => {
    this.props.moveSkullDownInQueue(this.props.index, this.props.playerID, this.props.matchID);
  }

  render() {
    const { skullID, index } = this.props;
    const skull = skulltulas[skullID];
    const area = areas.get(skull.area);
    return (
      <div
        className="queue-item"
        style={{ top: `${QUEUE_ITEM_HEIGHT * index}vh` }}
      >
        <button className="remove-button" onClick={this.onRemoveClick}>✕</button>
        <div className="flex-row">
          <img
            role="presentation"
            className="skull-image"
            src={`/images/skull${skullID}.png`}
          />
          <div className="flex-column flex-spaced button-area">
            <span className="area">{area.name}</span>
            <div className="flex-row">
              <div className="flex-column move-buttons">
                <button className="move-button" onClick={this.onMoveUpClick}>
                  🠽
                </button>
                <button className="move-button" onClick={this.onMoveDownClick}>
                  🠿
                </button>
              </div>
              <button
                className="primary"
                onClick={this.onClaimClick}
              >
                <span className="icon">✓</span>
                <span className="label">Claim!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ playerID: state.self.id, matchID: state.self.matchID }),
  {
    claimSkull,
    moveSkullDownInQueue,
    moveSkullUpInQueue,
    removeSkullFromQueue,
  },
)(QueueItem);
