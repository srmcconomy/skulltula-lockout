// @flow

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import type { List } from 'immutable';

import areas from '../data/areas';
import getAreaFromColour from '../util/getAreaFromColour';
import openArea from '../actions/client/openArea';
import setHoveredArea from '../actions/client/setHoveredArea';
import SkulltulaIcon from './SkulltulaIcon';
import skulltulas from '../data/skulltulas';
import type Player from '../types/Player';
import Scoreboard from './Scoreboard';

type Props = {
  players: List<Player>,
  hoveredArea: string,
  playerSkulls: List<number>,
  setHoveredArea: typeof setHoveredArea,
  openArea: typeof openArea,
};

type State = {
  size: ?number;
}

class SkulltulaMap extends PureComponent {
  props: Props;
  state: State;

  selectionMap: ?HTMLImageElement;
  map: ?HTMLImageElement;
  container: ?HTMLElement;
  canvas: ?HTMLCanvasElement;
  canvasContext: ?CanvasRenderingContext2D;
  width: number;
  height: number;
  left: number;
  top: number;
  naturalWidth: number;
  naturalHeight: number;

  constructor(props: Props) {
    super(props);
    this.state = { size: null };
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions = () => {
    const { map, container } = this;
    if (container) {
      if (container.offsetHeight > container.offsetWidth) {
        this.setState({ size: container.offsetWidth });
      } else {
        this.setState({ size: container.offsetHeight });
      }
    }
    if (map) {
      const { left, top, width, height } = map.getBoundingClientRect();
      this.width = width;
      this.height = height;
      this.top = top;
      this.left = left;
    }
  }

  onSelectionMapLoad = () => {
    const { map, selectionMap } = this;
    if (!map || !selectionMap) {
      return;
    }
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const { naturalHeight, naturalWidth } = map;
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    if (canvasContext) {
      canvasContext.drawImage(
        selectionMap,
        0,
        0,
        naturalWidth,
        naturalHeight,
      );
    }
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.naturalWidth = naturalWidth;
    this.naturalHeight = naturalHeight;
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  onMouseMove = (e: MouseEvent) => {
    const {
      canvasContext,
      height,
      left,
      naturalHeight,
      naturalWidth,
      top,
      width,
    } = this;
    if (!canvasContext) {
      return;
    }
    const { clientX, clientY } = e;
    const pixelColour = canvasContext.getImageData(
      (((clientX - left) / width) * naturalWidth) | 0,
      (((clientY - top) / height) * naturalHeight) | 0,
      1,
      1,
    ).data;
    const area = getAreaFromColour(
      pixelColour[0],
      pixelColour[1],
      pixelColour[2],
    );
    this.props.setHoveredArea(area);
  }

  onMouseOut = () => {
    this.props.setHoveredArea(null);
  }

  onClick = () => {
    const { hoveredArea } = this.props;
    if (hoveredArea) {
      this.props.openArea(hoveredArea);
    }
  }

  render() {
    const { players, playerSkulls, hoveredArea } = this.props;
    const highlights = areas.valueSeq().map(area => (
      <img
        key={area.name}
        role="presentation"
        className={`highlight${hoveredArea === area.id ? ' show' : ''}`}
        src={`/images/${area.id}-highlight.png`}
      />
    ));
    const skulltulaIcons = skulltulas.map((skulltula, id) => {
      const player = players.get(playerSkulls.get(id));
      const colour = player ? player.colour : 'grey';
      return (
        <SkulltulaIcon
          key={id}
          position={skulltula.position}
          colour={colour}
          active={hoveredArea ? hoveredArea === skulltula.area : true}
        />
      );
    });
    let content = null;
    if (this.state.size) {
      content = (
        <div
          className="map-sizer"
          style={{ height: this.state.size, width: this.state.size }}
        >
          <div className="map-padding">
            {this.props.noscoreboard ? null :
              <div className="scoreboard-container">
                <Scoreboard />
              </div>
            }
            {highlights}
            <img
              role="presentation"
              className="map"
              src="/images/map.png"
              onMouseMove={this.onMouseMove}
              onMouseOut={this.onMouseOut}
              onClick={this.onClick}
              ref={el => { this.map = el; }}
              style={{ cursor: hoveredArea ? 'pointer' : 'inherit' }}
            />
            {skulltulaIcons}
            <img
              role="presentation"
              className="selection-map"
              onLoad={this.onSelectionMapLoad}
              src="/images/selection-map.png"
              ref={el => { this.selectionMap = el; }}
            />
          </div>
        </div>
      );
    }
    return (
      <div
        className="map-container"
        ref={el => { this.container = el; }}
      >
        {content}
      </div>
    );
  }
}

export default connect(
  state => ({
    hoveredArea: state.hoveredArea,
    playerSkulls: state.matches.get(state.self.matchID).playerSkulls,
    players: state.matches.get(state.self.matchID).players,
  }),
  {
    setHoveredArea,
    openArea,
  },
)(SkulltulaMap);
