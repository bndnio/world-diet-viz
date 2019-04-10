import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';

import './LineChart.css';

const settings = {
  width: 1000,
  height: 300,
  padding: 50,
  numDataPoints: 50,
  maxRange: () => Math.random() * 1000,
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
          [year]
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
          [total kCal]
        </text>
        <YAxis
          translate={`translate(${settings.width - this.props.padding * 2}, 0)`}
          scale={this.props.otherYScale}
          flip
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={`translate(${settings.width - 10}, ${settings.height /
            2}), rotate(-90)`}
        >
          [Mean Age of Death]
        </text>
      </g>
    );
  }
}

class Lines extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderLine(coords) {
    return (
      <line
        x1={this.props.xScale(coords[0])}
        y1={this.props.yScale(coords[1])}
        x2={this.props.xScale(coords[2])}
        y2={this.props.yScale(coords[3])}
        strokeWidth={2}
        stroke={this.props.color}
      />
    );
  }

  render() {
    return <g>{this.props.data.map(this.renderLine.bind(this))}</g>;
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

class LineGraph extends React.Component {
  static propTypes = {
    padding: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  };

  getXScale() {
    return d3
      .scaleLinear()
      .domain([1983, 2013]) // When data begins, ends
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getDataYScale() {
    return d3
      .scaleLinear()
      .domain([1500, 2500])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }
  getDeathYScale() {
    return d3
      .scaleLinear()
      .domain([50, 100])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() {
    const xScale = this.getXScale();
    const yDataScale = this.getDataYScale();
    const yDeathDataScale = this.getDeathYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <Lines
          xScale={xScale}
          yScale={yDataScale}
          {...this.props}
          data={this.props.data}
          color="#cbcfd6"
        />
        <Lines
          xScale={xScale}
          yScale={yDeathDataScale}
          {...this.props}
          data={this.props.deathData}
          color="#000000"
        />
        <DataCircles
          xScale={xScale}
          yScale={yDataScale}
          {...this.props}
          data={this.props.data}
          color="#cbcfd6"
        />
        <DataCircles
          xScale={xScale}
          yScale={yDeathDataScale}
          {...this.props}
          data={this.props.deathData}
          color="#000000"
        />
        <XYAxis
          xScale={xScale}
          yScale={yDataScale}
          otherYScale={yDeathDataScale}
          {...this.props}
        />
      </svg>
    );
  }
}

class LineChart extends React.Component {
  componentWillMount() {
    this.getData();
  }

  getData() {
    // each datapoint in form of [year, age, nextYear, nextAge]
    const myData = [
      [1983, 2055],
      [1984, 2056],
      [1986, 2053],
      [1988, 2061],
      [1990, 2164],
      [1992, 2162],
      [1994, 2189],
      [1996, 2159],
      [1998, 2209],
      [2000, 2183],
      [2002, 2155],
      [2004, 2124],
      [2006, 2124],
      [2008, 2126],
      [2010, 2199],
      [2012, 2228],
    ];
    this.setState({
      data: myData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else return [yr[0], yr[1], [arr[i - 1][0]], [arr[i - 1][1]]];
        })
        .filter(d => !!d),
      deathData: myData
        .map(d => [d[0], d[1] / 27 + (Math.random() - 0.5) * 2])
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else return [yr[0], yr[1], [arr[i - 1][0]], [arr[i - 1][1]]];
        })
        .filter(d => !!d),
    });
  }

  render() {
    return (
      <div>
        <h1>Total kCal Consumption & Mortality v. Time</h1>
        <LineGraph
          data={this.state.data}
          deathData={this.state.deathData}
          {...settings}
        />
      </div>
    );
  }
}

export default withData(LineChart);
