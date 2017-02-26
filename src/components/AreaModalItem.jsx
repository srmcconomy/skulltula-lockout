// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import addToBottomOfQueue from '../actions/player/addToBottomOfQueue';
import addToTopOfQueue from '../actions/player/addToTopOfQueue';
import claimSkull from '../actions/match/claimSkull';
import unclaimSkull from '../actions/match/unclaimSkull';
import type { Colour } from '../types/Colour';

type Props = {
  playerID: string,
  matchID: string,
  skullID: number,
  colour: ?Colour,
  unclaimButton: boolean;
  addToTopOfQueue: typeof addToTopOfQueue,
  addToBottomOfQueue: typeof addToBottomOfQueue,
  claimSkull: typeof claimSkull,
  unclaimSkull: typeof unclaimSkull,
};

class AreaModalItem extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.playerID !== this.props.playerID ||
      nextProps.skullID !== this.props.skullID ||
      nextProps.colour !== this.props.colour ||
      nextProps.unclaimButton !== this.props.unclaimButton
    );
  }

  onAddToTopOfQueueClick = () => {
    this.props.addToTopOfQueue(this.props.skullID, this.props.playerID, this.props.matchID);
  }

  onAddToBottomOfQueueClick = () => {
    this.props.addToBottomOfQueue(this.props.skullID, this.props.playerID, this.props.matchID);
  }

  onClaimClick = () => {
    this.props.claimSkull(this.props.skullID, this.props.playerID, this.props.matchID);
  }

  onUnclaimClick = () => {
    this.props.unclaimSkull(this.props.skullID, this.props.playerID, this.props.matchID);
  }

  render() {
    const { skullID, colour, unclaimButton } = this.props;
    return (
      <div className="area-modal-item flex-row">
        <img
          className={`skull-image${colour ? ` ${colour}` : ''}`}
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
  state => ({ playerID: state.self.id, matchID: state.self.matchID }),
  {
    addToBottomOfQueue,
    addToTopOfQueue,
    claimSkull,
    unclaimSkull,
  }
)(AreaModalItem);
