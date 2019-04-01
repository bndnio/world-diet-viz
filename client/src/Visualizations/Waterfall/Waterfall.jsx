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
  mode: MODE[1],
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

  renderRect = coord => {
    if (settings.mode === MODE[0]) {
      var dist = settings.width / 2 - this.props.xScale(coord.xDiff);
      var width = Math.abs(dist);
      var x = dist > 0 ? this.props.xScale(coord.xDiff) : settings.width / 2;
    } else if (settings.mode === MODE[1]) {
      dist = this.props.xScale(coord.xAbs) - this.props.xScale(coord.xLast);
      width = Math.abs(dist);
      x =
        coord.xDiff > 0
          ? this.props.xScale(coord.xLast)
          : this.props.xScale(coord.xAbs);
    }
    console.log(coord.xLast, coord.xDiff);

    return (
      <rect
        x={x}
        y={this.props.yScale(coord.year)}
        width={width}
        height={
          (settings.height - settings.padding * 2) / settings.numDataPoints
        }
        className={coord.xDiff > 0 ? 'goodBar' : 'badBar'}
        key={Math.random() * 1}
      />
    );
  };

  renderRectText = coord => {
    if (settings.mode === MODE[0]) {
      var dist = settings.width / 2 - this.props.xScale(coord.xDiff);
      var x = settings.width / 2 - dist;
    } else if (settings.mode === MODE[1]) {
      dist = this.props.xScale(coord.xAbs) - this.props.xScale(coord.xLast);
      x = this.props.xScale(coord.xLast) + (coord.xDiff > 0 ? 3 : -3);
    }

    return (
      <text
        textAnchor={coord.xDiff > 0 ? 'start' : 'end'}
        x={x}
        y={
          this.props.yScale(coord.year) +
          settings.height / settings.numDataPoints / 2 +
          3
        }
        key={Math.random() * 1}
      >
        {coord.xDiff > 0 && '+'}
        {coord.xDiff}
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
    if (settings.mode === MODE[0]) {
      var xMin = d3.min(this.props.data, d => d.xDiff);
      var xMax = d3.max(this.props.data, d => d.xDiff);
    } else if (settings.mode === MODE[1]) {
      xMin = d3.min(this.props.data, d => d.xAbs);
      xMax = d3.max(this.props.data, d => d.xAbs);
    }

    const absMax = d3.max([Math.abs(xMin), Math.abs(xMax)]);
    console.log(absMax, xMin, xMax);
    return d3
      .scaleLinear()
      .domain([-absMax, absMax])
      .range([this.props.padding, this.props.width - this.props.padding]);
  };

  getYScale = () => {
    const yMin = d3.min(this.props.data, d => d.year);
    const yMax = d3.max(this.props.data, d => d.year);

    return d3
      .scaleLinear()
      .domain([yMin, yMax + 1])
      .range([this.props.padding, this.props.height - this.props.padding]);
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
    const randomData = d3
      .range(settings.numDataPoints)
      .map((value, index) => {
        return [
          settings.baseYear + index,
          Math.floor(Math.random() * settings.maxRange()),
        ];
      })
      .map((datum, index, arr) => {
        if (index !== 0) {
          return {
            year: datum[0],
            xLast: arr[index - 1][1],
            xDiff: datum[1] - arr[index - 1][1],
            xAbs: datum[1],
          };
        }
        return null;
      })
      .filter(val => !!val);
    this.setState({ data: randomData });
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
