import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';

import './Waterfall.css';

const settings = {
  width: 500,
  height: 300,
  padding: 30,
  numDataPoints: 50,
  maxRange: () => Math.random() * 1000,
};

class Axis extends React.Component {
  static propTypes = {
    translate: PropTypes.string.isRequired,
    orient: PropTypes.oneOf(['bottom', 'left']).isRequired,
    scale: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const node = this.refs.axisContainer;
    const baseAxis =
      this.props.orient === 'bottom'
        ? d3.axisBottom()
        : this.props.orient === 'left'
        ? d3.axisLeft()
        : null;
    const axis = baseAxis.ticks(5).scale(this.props.scale);

    d3.select(node).call(axis);
  }

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
          translate={`translate(0, ${this.props.height - this.props.padding})`}
          scale={this.props.xScale}
          orient="bottom"
        />
        <Axis
          translate={`translate(${this.props.padding}, 0)`}
          scale={this.props.yScale}
          orient="left"
        />
      </g>
    );
  }
}

class DataCircles extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderCircle(coords) {
    return (
      <circle
        cx={this.props.xScale(coords[0])}
        cy={this.props.yScale(coords[1])}
        r={2}
        key={Math.random() * 1}
      />
    );
  }

  render() {
    return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>;
  }
}

class ScatterPlot extends React.Component {
  static propTypes = {
    padding: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  };

  getXScale() {
    const xMax = d3.max(this.props.data, d => d[0]);

    return d3
      .scaleLinear()
      .domain([0, xMax])
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getYScale() {
    const yMax = d3.max(this.props.data, d => d[1]);

    return d3
      .scaleLinear()
      .domain([0, yMax])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() {
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

class Waterfall extends Component {
  componentWillMount() {
    this.randomizeData();
  }

  randomizeData() {
    const randomData = d3.range(settings.numDataPoints).map(() => {
      return [
        Math.floor(Math.random() * settings.maxRange()),
        Math.floor(Math.random() * settings.maxRange()),
      ];
    });
    this.setState({ data: randomData });
  }

  render() {
    return (
      <div>
        <h1>React and D3 are Friends</h1>
        <ScatterPlot data={this.state.data} {...settings} />
        <div className="controls">
          <button
            className="btn randomize"
            onClick={this.randomizeData.bind(this)}
          >
            Randomize Data
          </button>
        </div>
      </div>
    );
  }
}

Waterfall.propTypes = {};

export default withData(Waterfall);
