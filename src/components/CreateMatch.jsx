// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import createMatch from '../actions/public/createMatch';

class CreateMatch extends Component {
  render() {
    return (
      <button className="create-match primary" onClick={this.props.onClick}>Create Match</button>
    );
  }
}

export default connect(
  undefined,
  { createMatch },
)(CreateMatch);
