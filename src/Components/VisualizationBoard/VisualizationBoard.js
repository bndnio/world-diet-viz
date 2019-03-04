import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationBoard.css';
import VisualizationSelector from '../VisualizationSelector';

class VisualizationBoard extends Component {
  state = {
    openVisualization: null,
  };

  openVisualization = visualizationComponent => {
    this.setState({ openVisualization: visualizationComponent });
  };

  render() {
    return (
      <div className="VisualizationBoard">
        <VisualizationSelector openVisualization={this.openVisualization} />
        {!!this.state.openVisualization ? (
          <this.state.openVisualization />
        ) : null}
      </div>
    );
  }
}

VisualizationBoard.propTypes = {};

export default VisualizationBoard;
