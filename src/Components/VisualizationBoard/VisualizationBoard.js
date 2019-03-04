import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationBoard.css';
import VisualizationSelector from '../VisualizationSelector';

class VisualizationBoard extends Component {
  render() {
    return (
      <div className="VisualizationBoard">
        <VisualizationSelector />
        VisualizationBoard
      </div>
    );
  }
}

VisualizationBoard.propTypes = {};

export default VisualizationBoard;
