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

  getCircleRadius(value) {
    return Math.sqrt(value / Math.PI) * 2.5
  }

  renderCircle(coords) {
    return (
      <svg>
        <circle
          cx={this.props.xScale(coords[2])}
          cy={this.props.yScale(coords[3])}
          r={this.getCircleRadius(coords[4])}
          key={Math.random()}
          fill={this.props.color}
          //onMouseDown={function() {d3.select('circle').attr('fill', 'red')}}        // selects the first circle element
          //onMouseDown={function() {d3.selectAll('circle').attr('fill', 'red')}}     // selects all circle element
          //onMouseDown={function() {d3.select(this).attr('fill', 'red')}}            // doesn't work, but I feel like it should
          onMouseOver={function() {console.log('Hovering')}}
          onMouseOut={function() {console.log('Done hovering')}}
        />
        <text
          className="data_labels"
          x={this.props.xScale(coords[2]) + this.getCircleRadius(coords[4])}
          y={this.props.yScale(coords[3]) - 3}
        >{coords[0]}</text>
      </svg>
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
    // each datapoint in form of [Country, year, total KCals, LifeExpect, population]
    const myData = [
      ["Canada", 2012, 2055, 83, 100],
      ["Oh Im sorry I thought this was Amurica", 2012, 2056, 76, 10],
      ["A", 2012, 2008, 91, 100],
      ["B", 2012, 2061, 78, 10],
      ["C", 2012, 2164, 88, 100],
      ["D", 2012, 2162, 64, 1],
      ["E", 2012, 2323, 76, 1],
      ["F", 2012, 2159, 78, 100],
      ["G", 2012, 2308, 59, 10],
      ["H", 2012, 2183, 86, 10],
      ["I", 2012, 2155, 89, 10],
      ["J", 2012, 2124, 79, 100],
      ["K", 2012, 2124, 74, 100],
      ["L", 2012, 2126, 76, 1],
      ["M", 2012, 2199, 58, 1],
      ["N", 2012, 2228, 99, 100],
      ["Pop: 1", 2012, 2025, 100, 1],
      ["Pop: 10", 2012, 2025, 90, 10],
      ["Pop: 50", 2012, 2025, 80, 50],
      ["Pop: 100", 2012, 2025, 70, 100],
      ["Pop: 1000", 2012, 2025, 50, 1000]
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
