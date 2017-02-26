import React, { Component } from 'react';

import SkulltulaMap from './SkulltulaMap';
import Scoreboard from './Scoreboard';

export default class Watch extends Component {
  render() {
    return (
      <div className="watch">
        <div className="main-title">
          <div className="main">
            Skulltula Lockout
          </div>
        </div>
        <div className="desc">
          Each player must try to collect skulltulas that no other player has.
        </div>
        <Scoreboard abs />
        <SkulltulaMap noscoreboard />
      </div>
    )
  }
}
