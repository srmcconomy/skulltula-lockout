// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import areas from '../data/areas';
import setHoveredArea from '../actions/setHoveredArea';
import openArea from '../actions/openArea';

type Props = {
  hoveredArea: string,
  setHoveredArea: typeof setHoveredArea,
  openArea: typeof openArea,
};

class AreaList extends PureComponent {
  props: Props;

  onMouseOver(area: string) {
    return () => {
      this.props.setHoveredArea(area);
    };
  }

  onMouseOut = () => {
    this.props.setHoveredArea(null);
  }

  onClick(area: string) {
    return () => {
      this.props.openArea(area);
    };
  }

  render() {
    const { hoveredArea } = this.props;
    const areaButtons = areas.valueSeq().sort((a, b) => (a.name < b.name ? -1 : 1)).map(area => (
      <button
        key={area.id}
        className={`area-name${area.id === hoveredArea ? ' active' : ''}`}
        onMouseOver={this.onMouseOver(area.id)}
        onMouseOut={this.onMouseOut}
        onClick={this.onClick(area.id)}
      >
        <div className="label">{area.name}</div>
      </button>
    ));
    return (
      <div className="area-list">
        {areaButtons}
      </div>
    );
  }
}

export default connect(
  state => ({
    hoveredArea: state.hoveredArea,
  }),
  {
    setHoveredArea,
    openArea,
  }
)(AreaList);
