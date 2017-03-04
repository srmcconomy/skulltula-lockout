// @flow

import React, { Component } from 'react';

import SkulltulaMap from './SkulltulaMap';
import AreaList from './AreaList';
import AreaModal from './AreaModal';
import Queue from './Queue';
import ScrollArea from './ScrollArea';

const images = [];

export default class Match extends Component {

  componentDidMount() {
    if (images.length < 100) {
      for (let i = 0; i < 100; i++) {
        images[i] = new Image();
        images[i].src = `/images/skull${i}.png`;
      }
    }
  }

  render() {
    return (
      <div className="match">
        <div className="left-bar">
          <div className="fill">
            <ScrollArea>
              <Queue />
            </ScrollArea>
            <div className="protip">
              Press <i>space</i> to claim the top Skulltula in your queue!
            </div>
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
