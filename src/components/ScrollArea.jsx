import React, { PureComponent } from 'react';

type Props = {
  children: any,
}

type State = {
  hideTop: boolean,
  hideBottom: boolean,
}

export default class ScrollArea extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hideTop: false, hideBottom: true };
  }

  onScroll = (e: Event) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    let hideTop = false;
    let hideBottom = false;
    if (scrollTop > 0) {
      hideTop = true;
    }
    if (scrollTop < scrollHeight - offsetHeight) {
      hideBottom = true;
    }
    this.setState({ hideTop, hideBottom });
  }

  render() {
    const { hideTop, hideBottom } = this.state;
    return (
      <div className="scroll-area-container">
        <div className={`hider top${hideTop ? ' active' : ''}`} />
        <div className={`hider bottom${hideBottom ? ' active' : ''}`} />
        <div
          onScroll={this.onScroll}
          className="scroll-area"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
