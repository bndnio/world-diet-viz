import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VisualizationBase extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="VisualizationBase-container">
        {this.props.children || 'Visualization Placeholder'}
      </div>
    );
  }
}

export default VisualizationBase;
