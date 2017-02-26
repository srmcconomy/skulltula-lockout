// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import MatchList from './MatchList';
import CreateMatch from './CreateMatch';
import CreateMatchModal from './CreateMatchModal';
import JoinMatchModal from './JoinMatchModal';

import type Player from '../types/Player';

type State = {
  showMatchModal: boolean,
  showJoinModal: boolean,
  joinMatchID: ?string,
};

type Props = {
  router: any,
  self: Player,
};

class App extends Component {
  state: State;
  props: Props;

  constructor() {
    super();
    this.state = { showMatchModal: false, showJoinModal: false, joinMatchID: null };
  }

  componentWillReceiveProps(props: Props) {
    if (props.self && props.self.matchID) {
      props.router.replace(`/match/${props.self.matchID}`);
    }
  }

  onCreateClick = () => {
    this.setState({ showMatchModal: true });
  }

  onJoinClick = matchID => {
    this.setState({ showJoinModal: true, joinMatchID: matchID });
  }

  render() {
    return (
      <div className="app">
        <div className="main-title">
          <div className="main">
            Skulltula Lockout
          </div>
          <div className="sub">
            OCS Playoffs 2
          </div>
        </div>
        <CreateMatchModal
          show={this.state.showMatchModal}
          onCloseClick={() => this.setState({ showMatchModal: false })}
        />
        <JoinMatchModal
          matchID={this.state.joinMatchID}
          show={this.state.showJoinModal}
          onCloseClick={() => this.setState({ showJoinModal: false })}
        />
        <div className="container">
          <CreateMatch onClick={this.onCreateClick} />
          <MatchList onJoinClick={this.onJoinClick} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ self: state.self }),
)(withRouter(App));
