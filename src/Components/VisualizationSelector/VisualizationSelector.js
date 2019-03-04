import React, { Component } from 'react';
import './VisualizationSelector.css';
import PropTypes from 'prop-types';

import * as Visualizations from '../../Visualizations';

class VisualizationSelector extends Component {
  openVisualization = visualizationComponent => () => {
    this.props.openVisualization(visualizationComponent);
  };

  render() {
    return (
      <div className="VisualizationSelector">
        <ul>
          <li onClick={this.openVisualization(Visualizations.SimpleViz)}>
            SimpleViz
          </li>
          <li>other</li>
          <li>and another</li>
        </ul>
      </div>
    );
  }
}

VisualizationSelector.propTypes = {};

export default VisualizationSelector;
