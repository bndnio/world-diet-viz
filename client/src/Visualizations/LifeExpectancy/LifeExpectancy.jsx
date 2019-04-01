import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { withData } from '../../DataContext/withData';

import './LifeExpectancy.css';

const settings = {
  width: 1000,
  height: 600,
  padding: 40,
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
    const baseAxis = d3.axisLeft().ticks(5);
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
          translate={`translate(0, ${this.props.height - this.props.padding})`}
          scale={this.props.xScale}
        />
        <YAxis
          translate={`translate(${this.props.padding}, 0)`}
          scale={this.props.yScale}
        />
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
        stroke={'#cbcfd6'}
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
        fill={'#4295f4'}
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
      .domain([1985, 2015]) // When data begins, ends
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getYScale() {
    return d3
      .scaleLinear()
      .domain([0, 100]) // Age 0 to age 100. Should be constant values
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() {
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <Lines xScale={xScale} yScale={yScale} {...this.props} />
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

class LifeExpectancy extends React.Component {
  componentWillMount() {
    this.getData();
  }

  getData() {
    // each datapoint in form of [year, age, nextYear, nextAge]
    const myData = [
      [1985, 55, 1986, 56],
      [1986, 56, 1988, 53],
      [1988, 53, 1990, 61],
      [1990, 61, 1992, 64],
      [1992, 64, 1995, 62],
      [1995, 62, 1998, 59],
      [1998, 59, 2000, 63],
      [2000, 63, 2002, 65],
      [2002, 65, 2005, 64],
      [2005, 64, 2007, 66],
      [2007, 66, 2010, 69],
      [2010, 69, 2012, 68],
      [2012, 68, 2015, 70],
    ];
    this.setState({ data: myData });
  }

  render() {
    return (
      <div>
        <h1>Life Expectancy</h1>
        <LineGraph data={this.state.data} {...settings} />
        <text className="x-axis">Year</text>
        <text className="y-axis">Age</text>
      </div>
    );
  }
}

export default withData(LifeExpectancy);
