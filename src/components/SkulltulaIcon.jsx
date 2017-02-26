// @flow

import React, { PureComponent } from 'react';

import type Vector2 from '../types/Vector2';
import type Colour from '../types/Colour';

type Props = {
  position: Vector2,
  colour: Colour,
  active: boolean,
};

export default class SkulltulaIcon extends PureComponent {
  props: Props;

  render() {
    const { position, colour, active } = this.props;
    return (
      <div
        className={`skulltula ${colour}${active ? ' active' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      />
    );
  }
}
