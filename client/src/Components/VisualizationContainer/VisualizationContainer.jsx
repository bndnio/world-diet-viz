import React, { Component } from 'react';
import VisualizationBase from '../VisualizationBase';
import {
  CountryPicker,
  YearSlider,
  LineChart,
  Waterfall,
  ScatterPlot,
} from '../../Visualizations';
import { Layout } from 'antd';

import './VisualizationContainer.css';

const { Sider, Content } = Layout;

class VisualizationContainer extends Component {
  state = {
    waterfalls: [],
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
            <ScatterPlot />
          </VisualizationBase>
          <VisualizationBase>
            <LineChart />
          </VisualizationBase>
          {this.state.waterfalls}
          <VisualizationBase
            onClick={() =>
              this.setState({
                waterfalls: [
                  ...this.state.waterfalls,
                  <VisualizationBase>
                    <Waterfall />
                  </VisualizationBase>,
                ],
              })
            }
            style={{ width: 375 }}
          >
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
