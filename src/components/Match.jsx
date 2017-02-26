// @flow

import React, { Component } from 'react';

import SkulltulaMap from './SkulltulaMap';
import AreaList from './AreaList';
import AreaModal from './AreaModal';
import Queue from './Queue';
import ScrollArea from './ScrollArea';

export default class Match extends Component {
  render() {
    return (
      <div className="match">
        <div className="left-bar">
          <div className="fill">
            <ScrollArea>
              <Queue />
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
