import React, { Component } from 'react';
import VisualizationSelector from '../VisualizationSelector';
import VisualizationBase from '../VisualizationBase';
import { CountryPicker, YearSlider } from '../../Visualizations';
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
        <Sider theme="light">
          <h1 className="App-title">Nutrition InfoViz</h1>
          <VisualizationSelector openVisualization={this.openVisualization} />
          <CountryPicker />
          <YearSlider />
        </Sider>
        <Content>
          <VisualizationBase>
            {!!this.state.openVisualization ? (
              <this.state.openVisualization />
            ) : null}
          </VisualizationBase>
        </Content>
      </Layout>
    );
  }
}

// Receives no props
VisualizationContainer.propTypes = {};

export default VisualizationContainer;
