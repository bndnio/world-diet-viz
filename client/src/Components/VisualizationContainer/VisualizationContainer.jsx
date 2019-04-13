import React, { Component } from 'react';
import {
  CountryPicker,
  YearSlider,
  LineChart,
  Waterfall,
  ScatterPlot,
} from '../../Visualizations';
import { Layout, Card } from 'antd';

import './VisualizationContainer.css';

const { Sider, Content } = Layout;

class VisualizationContainer extends Component {
  state = {
    waterfalls: [],
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider theme="light" className="sideBar">
          <h1 className="App-title">Nutrition InfoViz</h1>
          <CountryPicker />
          <br />
          <YearSlider />
        </Sider>
        <Content className="dashboard">
          <ScatterPlot />
          <LineChart />
          {this.state.waterfalls}
          <Card
            onClick={() =>
              this.setState({
                waterfalls: [...this.state.waterfalls, <Waterfall />],
              })
            }
            style={{ width: 375 }}
          >
            Click to add Waterfall
          </Card>
        </Content>
      </Layout>
    );
  }
}

// Receives no props
VisualizationContainer.propTypes = {};

export default VisualizationContainer;
