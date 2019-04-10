import React, { Component } from 'react';
import VisualizationSelector from '../VisualizationSelector';
import VisualizationBase from '../VisualizationBase';
import {
  CountryPicker,
  YearSlider,
  LineChart,
  Waterfall,
} from '../../Visualizations';
import { Layout } from 'antd';

import './VisualizationContainer.css';

const { Sider, Content } = Layout;

class VisualizationContainer extends Component {
  state = {
    openVisualization: null,
  };

  openVisualization = visualizationComponent => {
    this.setState({ openVisualization: visualizationComponent });
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider theme="light" className="sideBar">
          <h1 className="App-title">Nutrition InfoViz</h1>
          {/* <VisualizationSelector openVisualization={this.openVisualization} /> */}
          <CountryPicker />
          <br />
          <YearSlider />
        </Sider>
        <Content className="dashboard">
          <VisualizationBase>
            {/* {!!this.state.openVisualization ? (
              <this.state.openVisualization />
            ) : null} */}
            <LineChart />
          </VisualizationBase>
          <VisualizationBase width={375}>
            <Waterfall />
          </VisualizationBase>
          <VisualizationBase width={375}>
            Click to add Waterfall
          </VisualizationBase>
        </Content>
      </Layout>
    );
  }
}

// Receives no props
VisualizationContainer.propTypes = {};

export default VisualizationContainer;
