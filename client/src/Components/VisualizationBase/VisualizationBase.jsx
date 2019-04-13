import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import './VisualizationBase.css';

class VisualizationBase extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    const { children, style, ...rest } = this.props;
    return (
      <div className="VisualizationBase-container">
        <Card style={{ ...style, padding: 0 }} {...rest} title="lol">
          {this.props.children || 'Pick a visualization to get started'}
        </Card>
      </div>
    );
  }
}

export default VisualizationBase;
