// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { List } from 'immutable';

import Modal from './Modal';
import closeArea from '../actions/closeArea';
import AreaModalItem from './AreaModalItem';
import areas from '../data/areas';
import type Player from '../types/Player';

type Props = {
  openedArea: ?string,
  players: List<Player>,
  playerSkulls: List<number>,
  closeArea: typeof closeArea,
};

class AreaModal extends PureComponent {
  props: Props;

  onCloseClick = () => {
    this.props.closeArea();
  }

  render() {
    const { openedArea, players, playerSkulls } = this.props;
    if (!openedArea) {
      return null;
    }
    const playerID = 0;
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
    openedArea: state.openedArea,
    players: state.players,
    playerSkulls: state.playerSkulls,
  }),
  { closeArea }
)(AreaModal);
