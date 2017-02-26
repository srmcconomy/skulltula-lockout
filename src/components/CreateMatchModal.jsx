// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import createMatch from '../actions/public/createMatch';

type State = {
  name: string,
  playerName: string,
  allowSpectators: boolean,
  password: string,
  colour: string,
};

type Props = {
  createMatch: typeof createMatch,
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

class CreateMatchModal extends Component {
  state: State;
  props: Props;

  constructor() {
    super();
    this.state = { name: '', playerName: '', password: '', allowSpectators: true, colour: 'red' };
  }

  renderColourRadio = (colour: string) => (
    <div
      key={colour}
      className={`colour ${colour}${this.state.colour === colour ? ' checked' : ''}`}
      name="colour"
      checked={this.state.colour === colour}
      onClick={this.handleColourClick(colour)}
    >
      <div className="inner" />
    </div>
  )

  handleMatchNameChange = event => {
    this.setState({ name: event.target.value });
  }

  handleNameChange = event => {
    this.setState({ playerName: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleSpectatorChange = event => {
    this.setState({ allowSpectators: event.target.checked });
  }

  handleColourClick(colour: string) {
    return () => {
      this.setState({ colour });
    };
  }

  handleCreateClick = () => {
    if (this.state.playerName.length > 0 && this.state.password.length > 0) {
      this.props.createMatch(
        this.state.name,
        this.state.playerName,
        this.state.playerName,
        this.state.colour,
        this.state.password,
        this.state.allowSpectators,
      );
      this.props.onCloseClick();
      this.setState({ playerName: '', password: '', allowSpectators: true, colour: 'red' });
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onCloseClick={this.props.onCloseClick}>
        <div className="create-match-modal">
          <div className="title">
            Create a new Match
          </div>
          <div className="container">
            <div>
              <label htmlFor="name">Match Name</label>
              <input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleMatchNameChange}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={this.state.playerName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="colours-container">
              Colour
              <div className="colours">
                {colours.map(this.renderColourRadio)}
              </div>
            </div>
            <div>
              <label htmlFor="password">Password for match</label>
              <input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
            <div>
              <label htmlFor="spectators">Allow Spectators</label>
              <input
                id="spectators"
                type="checkbox"
                checked={this.state.allowSpectators}
                onChange={this.handleSpectatorChange}
              />
            </div>
          </div>
          <button className="primary" onClick={this.handleCreateClick}>
            Create Match
          </button>
        </div>
      </Modal>
    );
  }
}

export default connect(undefined, { createMatch })(CreateMatchModal);
