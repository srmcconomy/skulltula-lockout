// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import joinMatch from '../actions/private/joinMatch';

import type Match from '../types/Match';

type State = {
  playerName: string,
  password: string,
  colour: string,
};

type Props = {
  matchID: string,
  match: Match,
  joinMatch: typeof joinMatch,
  onCloseClick: () => void,
  show: boolean,
};

const colours = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
];

class JoinMatchModal extends Component {
  state: State;
  props: Props;

  constructor() {
    super();
    this.state = { playerName: '', password: '', allowSpectators: true, colour: 'red' };
  }

  componentWillReceiveProps(props: Props) {
    if (!this.props.show && props.show && props.match) {
      const colour = colours.find(c => props.match.players.every(player => player.colour !== c));
      this.setState({ colour });
    }
  }

  renderColourRadio = (colour: string) => {
    const checked = this.state.colour === colour;
    const disabled = this.props.match.players.some(player => player.colour === colour);
    return (
      <div
        key={colour}
        className={`colour ${colour}${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}`}
        name="colour"
        checked={this.state.colour === colour}
        onClick={disabled ? null : this.handleColourClick(colour)}
      >
        <div className="inner" />
      </div>
    );
  }

  handleNameChange = event => {
    this.setState({ playerName: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleColourClick(colour: string) {
    return () => {
      this.setState({ colour });
    };
  }

  handleJoinClick = () => {
    if (this.state.playerName.length > 0 && this.state.password.length > 0) {
      this.props.joinMatch(
        this.state.playerName,
        this.state.playerName,
        this.state.colour,
        this.props.matchID,
        this.state.password,
      );
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Modal show={this.props.show} onCloseClick={this.props.onCloseClick}>
        <div className="join-match-modal">
          <div className="title">
            Join Match: {this.props.match.name}
          </div>
          <div className="flex-row">
            <div className="entrants-container">
              <div>Entrants</div>
              <div className="entrants">
                {this.props.match.players.valueSeq().map(player => (
                  <div className="entrant flex-row" key={player.id}>
                    <div className={`entrant-colour ${player.colour}`} />
                    <div className="player-name">
                      {player.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={this.state.playerName}
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="flex-row colours-container">
                Colour
                <div className="colours">
                  {colours.map(this.renderColourRadio)}
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
              </div>
            </div>
          </div>
          <button className="primary" onClick={this.handleJoinClick}>
            Join Match
          </button>
        </div>
      </Modal>
    );
  }
}

export default connect(
  (state, ownProps) => ({ match: state.matches.get(ownProps.matchID) }),
  { joinMatch },
)(JoinMatchModal);
