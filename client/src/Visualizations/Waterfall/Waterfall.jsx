import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';

import './Waterfall.css';

const MODE = ['ALIGN', 'FOLLOW'];

const settings = {
  width: 500,
  height: 600,
  padding: 40,
  baseYear: 1960,
  numDataPoints: 20,
  mode: MODE[0],
  maxRange: () => Math.random() * 100,
};

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
        : this.props.orient === 'top'
        ? d3.axisTop()
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
    padding: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  render() {
    return (
      <g className="xy-axis">
        <Axis
          translate={`translate(0, ${this.props.padding})`}
          scale={this.props.xScale}
          orient="top"
        />
        <Axis
          translate={`translate(${settings.width / 2}, 0)`}
          scale={this.props.yScale}
          orient="left"
        />
      </g>
    );
  }
}

class DataRectangles extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderRect = coords => {
    const distToAxis = settings.width / 2 - this.props.xScale(coords[0]);
    const width = Math.abs(distToAxis);
    const x =
      distToAxis > 0 ? this.props.xScale(coords[0]) : settings.width / 2;

    return (
      <rect
        x={x}
        y={this.props.yScale(coords[1])}
        width={width}
        height={
          (settings.height - settings.padding * 2) / settings.numDataPoints
        }
        className={distToAxis < 0 ? 'goodBar' : 'badBar'}
        key={Math.random() * 1}
      />
    );
  };

  renderRectText = coords => {
    const distToAxis = settings.width / 2 - this.props.xScale(coords[0]);
    const x = settings.width / 2 - distToAxis;

    return (
      <text
        textAnchor={distToAxis < 0 ? 'start' : 'end'}
        x={x}
        y={
          this.props.yScale(coords[1]) +
          settings.height / settings.numDataPoints / 2 +
          3
        }
      >
        {distToAxis < 0 ? '+' : '-'}
        {Math.round(this.props.xScale(coords[0]))}
      </text>
    );
  };

  render() {
    return (
      <g>
        {this.props.data.map(this.renderRect)}
        {this.props.data.map(this.renderRectText)}
      </g>
    );
  }
}

class ScatterPlot extends React.Component {
  static propTypes = {
    padding: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  };

  getXScale = () => {
    const xMin = d3.min(this.props.data, d => d[0]);
    const xMax = d3.max(this.props.data, d => d[0]);
    const absMax = d3.max([Math.abs(xMin), Math.abs(xMax)]);

    return d3
      .scaleLinear()
      .domain([-absMax, absMax])
      .range([this.props.padding, this.props.width - this.props.padding]);
  };

  getYScale = () => {
    const yMin = d3.min(this.props.data, d => d[1]);
    const yMax = d3.max(this.props.data, d => d[1]);

    return d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([this.props.height - this.props.padding, this.props.padding]);
  };

  render() {
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataRectangles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

class Waterfall extends Component {
  componentWillMount() {
    this.randomizeData();
  }

  randomizeData = () => {
    const randomData = d3.range(settings.numDataPoints).map((value, index) => {
      return [
        Math.floor(Math.random() * settings.maxRange()),
        settings.baseYear + index,
      ];
    });
    const randomDataDiffs = randomData
      .map((datum, index) => {
        if (index !== 0) {
          return [datum[0] - randomData[index - 1][0], datum[1]];
        }
        return null;
      })
      .filter(val => !!val);
    this.setState({ data: randomDataDiffs });
  };

  render() {
    return (
      <div>
        <h1>React and D3 are Friends</h1>
        <ScatterPlot data={this.state.data} {...settings} />
        <div className="controls">
          <button className="btn randomize" onClick={this.randomizeData}>
            Randomize Data
          </button>
        </div>
      </div>
    );
  }
}

Waterfall.propTypes = {};

export default withData(Waterfall);