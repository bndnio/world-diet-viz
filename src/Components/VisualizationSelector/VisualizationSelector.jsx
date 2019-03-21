import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VisualizationSelector.css';
import { Menu, Dropdown, Button } from 'antd';
import * as Visualizations from '../../Visualizations';

class VisualizationSelector extends Component {
  static propTypes = {
    // Set open visualization in parent component
    openVisualization: PropTypes.func.isRequired,
  };

  state = {
    openVisualization: 'ClickMe',
  };

  openVisualization = (visualizationName, visualizationComponent) => () => {
    this.setState({ openVisualization: visualizationName });
    this.props.openVisualization(visualizationComponent);
  };

  render() {
    const visualizationMenu = (
      <Menu>
        <Menu.Item
          onClick={this.openVisualization(
            'SimpleViz',
            Visualizations.SimpleViz
          )}
        >
          <span>SimpleViz</span>
        </Menu.Item>
        <Menu.Item onClick={this.openVisualization('Other', null)}>
          <span>Other</span>
        </Menu.Item>
        <Menu.Item onClick={this.openVisualization('AndAnother', null)}>
          <span>AndAnother</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="VisualizationSelector">
        <Dropdown overlay={visualizationMenu}>
          <Button>{this.state.openVisualization}</Button>
        </Dropdown>
      </div>
    );
  }
}

export default VisualizationSelector;
