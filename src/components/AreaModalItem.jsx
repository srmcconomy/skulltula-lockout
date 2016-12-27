// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import addToBottomOfQueue from '../actions/addToBottomOfQueue';
import addToTopOfQueue from '../actions/addToTopOfQueue';
import claimSkull from '../actions/claimSkull';
import unclaimSkull from '../actions/unclaimSkull';
import type { Colour } from '../types/Colour';

type Props = {
  playerID: number,
  skullID: number,
  colour: ?Colour,
  unclaimButton: boolean;
  addToTopOfQueue: typeof addToTopOfQueue,
  addToBottomOfQueue: typeof addToBottomOfQueue,
  claimSkull: typeof claimSkull,
  unclaimSkull: typeof unclaimSkull,
};

class AreaModalItem extends PureComponent {
  props: Props;

  onAddToTopOfQueueClick = () => {
    this.props.addToTopOfQueue(this.props.skullID, this.props.playerID);
  }

  onAddToBottomOfQueueClick = () => {
    this.props.addToBottomOfQueue(this.props.skullID, this.props.playerID);
  }

  onClaimClick = () => {
    this.props.claimSkull(this.props.skullID, this.props.playerID);
  }

  onUnclaimClick = () => {
    this.props.unclaimSkull(this.props.skullID);
  }

  render() {
    const { skullID, colour, unclaimButton } = this.props;
    return (
      <div className="area-modal-item flex-row" style={{ backgroundColor: colour }}>
        <img
          className="skull-image"
          role="presentation"
          src={`/images/skull${skullID}.png`}
        />
        <div className="flex-column flex-spaced">
          <button
            disabled={unclaimButton}
            onClick={this.onAddToTopOfQueueClick}
          >
            <span className="icon">↰</span>
            <span className="label">Add to top of queue</span>
          </button>
          <button
            disabled={unclaimButton}
            onClick={this.onAddToBottomOfQueueClick}
          >
            <span className="icon">↲</span>
            <span className="label">Add to bottom of queue</span>
          </button>
        </div>
        {
          unclaimButton ? (
            <button className="primary" onClick={this.onUnclaimClick}>
              <span className="icon">✕</span>
              <span className="label">Unclaim</span>
            </button>
          ) : (
            <button className="primary" onClick={this.onClaimClick}>
              <span className="icon">✓</span>
              <span className="label">Claim!</span>
            </button>
          )
        }
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    addToBottomOfQueue,
    addToTopOfQueue,
    claimSkull,
    unclaimSkull,
  }
)(AreaModalItem);
