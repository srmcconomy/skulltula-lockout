// @flow

import React, { PureComponent } from 'react';

import SkulltulaMap from './SkulltulaMap';
import AreaList from './AreaList';
import AreaModal from './AreaModal';
import Scoreboard from './Scoreboard';
import Queue from './Queue';
import ScrollArea from './ScrollArea';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <div className="left-bar">
          <div className="fill">
            <ScrollArea>
              <Queue playerID={0} />
            </ScrollArea>
          </div>
        </div>
        <div className="middle-bar fill">
          <SkulltulaMap />
        </div>
        <div className="right-bar">
          <AreaList />
        </div>
        <AreaModal />
      </div>
    );
  }
}
