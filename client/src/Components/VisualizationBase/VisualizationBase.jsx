import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationBase.css';

class VisualizationBase extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="VisualizationBase-container">
        {this.props.children || 'Pick a visualization to get started'}
      </div>
    );
  }
}

export default VisualizationBase;
