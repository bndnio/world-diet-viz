import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';

import './ScatterPlot.css';

const settings = {
  width: 1000,
  height: 300,
  padding: 50,
};

class XAxis extends React.Component {
  static propTypes = {
    translate: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.renderXAxis();
  }

  componentDidUpdate() {
    this.renderXAxis();
  }

  renderXAxis() {
    const node = this.refs.axisContainer;
    const baseAxis = d3
      .axisBottom()
      .ticks(5)
      .tickFormat(d3.format('d'));
    const axis = baseAxis.scale(this.props.scale);
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

class YAxis extends React.Component {
  static propTypes = {
    translate: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.renderYAxis();
  }

  componentDidUpdate() {
    this.renderYAxis();
  }

  renderYAxis() {
    const node = this.refs.axisContainer;
    let baseAxis;
    if (this.props.flip) baseAxis = d3.axisRight();
    else baseAxis = d3.axisLeft();
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
      <g className="LE-xy-axis">
        <XAxis
          translate={`translate(0, ${this.props.height -
          (this.props.padding * 2) / 3})`}
          scale={this.props.xScale}
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={`translate(${settings.width / 2 -
          this.props.padding / 2}, ${settings.height - 5})`}
        >
          [Total KCals]
        </text>
        <YAxis
          translate={`translate(${this.props.padding}, 0)`}
          scale={this.props.yScale}
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={`translate(10, ${settings.height / 2}), rotate(-90)`}
        >
          [Life Expectancy]</text>
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
        cx={this.props.xScale(coords[2])}
        cy={this.props.yScale(coords[3])}
        r={3}
        key={Math.random()}
        fill={this.props.color}
      />
    );
  }

  render() {
    return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>;
  }
}

class ScatterGraph extends React.Component {
  static propTypes = {
    padding: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  };

  getXScale() {
    return d3
      .scaleLinear()
      .domain([2000, 2350]) // When data begins, ends
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getDataYScale() {
    return d3
      .scaleLinear()
      .domain([50, 100])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() {
    const xScale = this.getXScale();
    const yDataScale = this.getDataYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles
          xScale={xScale}
          yScale={yDataScale}
          {...this.props}
          data={this.props.data}
          color="#80b0ff"
        />
        <XYAxis
          xScale={xScale}
          yScale={yDataScale}
          {...this.props}
        />
      </svg>
    );
  }
}

class ScatterPlot extends React.Component {
  componentWillMount() {
    this.getData();
  }

  getData() {
    // each datapoint in form of [Country, year, total KCals, LifeExpect]
    const myData = [
      ["Canada", 2012, 2055, 83],
      ["Im sorry I thought this was Amurica", 2012, 2056, 76],
      ["A", 2012, 2008, 91],
      ["B", 2012, 2061, 78],
      ["C", 2012, 2164, 88],
      ["D", 2012, 2162, 64],
      ["E", 2012, 2323, 76],
      ["F", 2012, 2159, 78],
      ["G", 2012, 2308, 59],
      ["H", 2012, 2183, 86],
      ["I", 2012, 2155, 89],
      ["J", 2012, 2124, 79],
      ["K", 2012, 2124, 74],
      ["L", 2012, 2126, 76],
      ["M", 2012, 2199, 58],
      ["N", 2012, 2228, 99],
    ];
    this.setState({
      data: myData
    });
  }

  render() {
    return (
      <div>
        <h1>Life Expectancy vs Total KCal</h1>
        <ScatterGraph
          data={this.state.data}
          {...settings}
        />
      </div>
    );
  }
}

export default withData(ScatterPlot);
