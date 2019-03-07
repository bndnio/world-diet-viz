import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationSelector.css';
import { Menu, Dropdown, Icon } from 'antd';
import * as Visualizations from '../../Visualizations';

class VisualizationSelector extends Component {
  static propTypes = {};

  state = {
    openVisualization: 'something',
  };

  openVisualization = visualizationComponent => () => {
    this.props.openVisualization(visualizationComponent);
  };

  render() {
    const visualizationMenu = (
      <Menu>
        <Menu.Item onClick={this.openVisualization(Visualizations.SimpleViz)}>
          <span>SimpleViz</span>
        </Menu.Item>
        <Menu.Item>
          <span>other</span>
        </Menu.Item>
        <Menu.Item>
          <span>and another</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="VisualizationSelector">
        <Dropdown overlay={visualizationMenu}>
          <span>this</span>
        </Dropdown>
      </div>
    );
  }
}

export default VisualizationSelector;
