import React, { Component } from 'react';

type Props = {
  show: boolean,
  onCloseClick: () => void,
};

export default class Modal extends Component {
  props: Props;

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal">
        <div className="modal-background" onClick={this.props.onCloseClick} />
        <div className="modal-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
}
