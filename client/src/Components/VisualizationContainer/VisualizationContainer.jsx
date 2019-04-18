import React, { Component } from 'react';
import { Layout, Card, Icon } from 'antd';
import {
  CountryPicker,
  YearRangeSlider,
  LineChart,
  Waterfall,
  ScatterPlot,
} from '../../Visualizations';
import PresetButton from '../PresetButton/PresetButton';

import './VisualizationContainer.css';

const { Sider, Content } = Layout;

class VisualizationContainer extends Component {
  state = {
    waterfalls: [],
    waterfallCount: 0,
  };

  handleCloseWaterfall = key => () => {
    this.setState(state => ({
      waterfalls: state.waterfalls.filter(w => +w.key !== key),
    }));
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider theme="light" className="sidebar">
          <div className="sidebarContent">
            <h1 className="App-title">Nutrition InfoViz</h1>
            <CountryPicker />
            <YearRangeSlider />
            <PresetButton
              countries={['Canada', 'Afghanistan', 'Mexico']}
              yearRange={[1990, 2000]}
            >
              Preset 1
            </PresetButton>
          </div>
          <a
            target="_blank"
            href="https://github.com/bndnio/world-diet-viz"
            rel="noopener noreferrer"
          >
            <Icon type="github" theme="outlined" />
          </a>
        </Sider>
        <Content className="dashboard">
          <ScatterPlot />
          <LineChart />
          {this.state.waterfalls}
          <Card
            size="small"
            hoverable
            bodyStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '200px',
              height: '120px',
            }}
            onClick={() =>
              this.setState(state => ({
                waterfalls: [
                  ...state.waterfalls,
                  <Waterfall
                    key={state.waterfallCount}
                    handleClose={this.handleCloseWaterfall(
                      state.waterfallCount
                    )}
                  />,
                ],
                waterfallCount: state.waterfallCount + 1,
              }))
            }
          >
            Waterfall
            <br />
            <Icon type="plus" theme="outlined" style={{ fontSize: 30 }} />
          </Card>
        </Content>
      </Layout>
    );
  }
}

// Receives no props
VisualizationContainer.propTypes = {};

export default VisualizationContainer;
