// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { List } from 'immutable';

import Modal from './Modal';
import closeArea from '../actions/client/closeArea';
import AreaModalItem from './AreaModalItem';
import areas from '../data/areas';
import type Player from '../types/Player';

type Props = {
  playerID: string,
  openedArea: ?string,
  players: List<Player>,
  playerSkulls: List<number>,
  closeArea: typeof closeArea,
};

class AreaModal extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.openedArea !== this.props.openedArea ||
      nextProps.players !== this.props.players ||
      nextProps.playerSkulls !== this.props.playerSkulls
    );
  }

  onCloseClick = () => {
    this.props.closeArea();
  }

  render() {
    const { openedArea, players, playerSkulls, playerID } = this.props;
    if (!openedArea) {
      return null;
    }
    const area = areas.get(openedArea);
    const items = area.skulltulas.map(skullID => {
      const claimingPlayerID = playerSkulls.get(skullID);
      const claimingPlayer = claimingPlayerID ?
        players.get(claimingPlayerID) :
        null;
      return (
        <AreaModalItem
          skullID={skullID}
          playerID={playerID}
          key={skullID}
          colour={claimingPlayer ? claimingPlayer.colour : null}
          unclaimButton={claimingPlayerID === playerID}
        />
      );
    });
    return (
      <Modal show={!!openedArea} onCloseClick={this.onCloseClick}>
        <div className="area-modal">
          <div className="area-name">
            {area.name}
          </div>
          <div className="items">
            {items}
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    playerID: state.self.id,
    openedArea: state.openedArea,
    players: state.matches.get(state.self.matchID).players,
    playerSkulls: state.matches.get(state.self.matchID).playerSkulls,
  }),
  { closeArea },
)(AreaModal);
