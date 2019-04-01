import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';
import { Typography } from 'antd';

import './ScatterPlot.css';

const { Title } = Typography;

class Axis extends React.Component {
  static propTypes = {
    translate: PropTypes.string.isRequired,
    orient: PropTypes.oneOf(['bottom', 'top', 'left']).isRequired,
    scale: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis = () => {
    const node = this.refs.axisContainer;
    const baseAxis =
      this.props.orient === 'bottom'
        ? d3.axisBottom()
        : this.props.orient === 'left'
        ? d3.axisLeft()
        : null;
    const axis = baseAxis.ticks(5).scale(this.props.scale);

    d3.select(node).call(axis);
  };

  render() {
    return (
      <g
        className="axis"
        ref="axisContainer"
        transform={this.props.translate}
      />
    );
  }
}

class XYAxis extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      padding: PropTypes.number,
    }),
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  render() {
    const { settings } = this.props;

    return (
      <g className="xy-axis">
        <Axis
          translate={`translate(0, ${settings.height - settings.padding})`}
          scale={this.props.xScale}
          orient="bottom"
        />
        <Axis
          translate={`translate(${settings.padding}, 0)`}
          scale={this.props.yScale}
          orient="left"
        />
      </g>
    );
  }
}

class DataCircles extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      numDataPoints: PropTypes.number,
    }),
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderCircle = coords => {
    return (
      <circle
        cx={this.props.xScale(coords[0])}
        cy={this.props.yScale(coords[1])}
        r={2}
        key={Math.random() * 1}
      />
    );
  };

  render() {
    return <g>{this.props.data.map(this.renderCircle)}</g>;
  }
}

class ScatterPlot extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      numDataPoints: PropTypes.number,
      maxRange: PropTypes.func,
    }),
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  };

  getXScale = () => {
    const { settings } = this.props;

    const xMax = d3.max(this.props.data, d => d[0]);

    return d3
      .scaleLinear()
      .domain([0, xMax])
      .range([settings.padding, settings.width - settings.padding * 2]);
  };

  getYScale = () => {
    const { settings } = this.props;

    const yMax = d3.max(this.props.data, d => d[1]);

    return d3
      .scaleLinear()
      .domain([0, yMax])
      .range([settings.height - settings.padding, settings.padding]);
  };

  render() {
    const { settings } = this.props;

    const xScale = settings.xScale || this.getXScale();
    const yScale = settings.yScale || this.getYScale();

    return (
      <svg width={settings.width} height={settings.height}>
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

class ScatterPlotViz extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      numDataPoints: PropTypes.number,
      maxRange: PropTypes.func,
    }),
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  };
  static defaultProps = {
    settings: {
      width: 500,
      height: 300,
      padding: 30,
      numDataPoints: 50,
      maxRange: () => Math.random() * 1000,
    },
  };

  componentWillMount() {
    this.randomizeData();
  }

  randomizeData = () => {
    const { settings } = this.props;

    const randomData = d3.range(settings.numDataPoints).map(() => {
      return [
        Math.floor(Math.random() * settings.maxRange()),
        Math.floor(Math.random() * settings.maxRange()),
      ];
    });
    this.setState({ data: randomData });
  };

  render() {
    const { settings } = this.props;

    return (
      <div>
        <Title>Sample Scatterplot</Title>
        <ScatterPlot data={this.state.data} settings={settings} />
        <div className="controls">
          <button className="btn randomize" onClick={this.randomizeData}>
            Randomize Data
          </button>
        </div>
      </div>
    );
  }
}

export default withData(ScatterPlotViz);
