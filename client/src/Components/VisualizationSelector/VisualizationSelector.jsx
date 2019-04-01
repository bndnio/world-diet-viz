import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationSelector.css';
import { Menu } from 'antd';
import * as Visualizations from '../../Visualizations';

class VisualizationSelector extends Component {
  static propTypes = {
    // Set open visualization in parent component
    openVisualization: PropTypes.func.isRequired,
  };

  state = {
    openKeys: ['visualizations'],
  };

  toggleOpen = () => {
    this.setState(state => {
      if (state.openKeys.length === 0) {
        return { openKeys: ['visualizations'] };
      } else {
        return { openKeys: [] };
      }
    });
  };

  handleClick = e => {
    const { key } = e;
    this.props.openVisualization(Visualizations[key] || null);
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.toggleOpen}
        onClick={this.handleClick}
      >
        <Menu.SubMenu key="visualizations" title={<span>Visualization</span>}>
          <Menu.Item key="ScatterPlot">ScatterPlot</Menu.Item>
          <Menu.Item key="Waterfall">Waterfall</Menu.Item>
          <Menu.Item>Other</Menu.Item>
          <Menu.Item>AndAnother</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default VisualizationSelector;
