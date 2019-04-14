import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Card } from 'antd';
import { withData } from '../../Contexts/DataContext/withData';

import './ScatterPlot.css';

const settings = {
  width: 500,
  height: 400,
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
          translate={`translate(0, ${this.props.height - this.props.padding})`}
          scale={this.props.xScale}
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={`translate(${settings.width / 2 -
            this.props.padding / 2}, ${settings.height - 10})`}
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
          [Life Expectancy]
        </text>
      </g>
    );
  }
}

class DataCircles extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  getCircleRadius(value) {
    return Math.sqrt(value / Math.PI) * 2.5;
  }

  renderCircle(coords) {
    return (
      <svg>
        <circle
          cx={this.props.xScale(coords[2])}
          cy={this.props.yScale(coords[3])}
          r={this.getCircleRadius(coords[4])}
          key={Math.random()}
          //fill={this.props.color}
          fill={this.state.hovered ? 'red' : this.props.color}
          //onMouseDown={function() {d3.select('circle').attr('fill', 'red')}}        // selects the first circle element
          //onMouseDown={function() {d3.selectAll('circle').attr('fill', 'red')}}     // selects all circle element
          //onMouseDown={function() {d3.select(this).attr('fill', 'red')}}            // doesn't work, but I feel like it should
          //onMouseOver={function() {console.log('Hovering')}}
          //onMouseOut={function() {console.log('Done hovering')}}
          onMouseDown={() => this.setState({ hovered: true })}
          onMouseUp={() => this.setState({ hovered: false })}
        />
        <text
          className="data_labels"
          x={this.props.xScale(coords[2]) + this.getCircleRadius(coords[4])}
          y={this.props.yScale(coords[3]) - 3}
        >
          {coords[0]}
        </text>
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
      .range([this.props.padding, this.props.width - this.props.padding / 2]);
  }

  getDataYScale() {
    return d3
      .scaleLinear()
      .domain([50, 100])
      .range([this.props.height - this.props.padding, this.props.padding / 2]);
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
        <XYAxis xScale={xScale} yScale={yDataScale} {...this.props} />
      </svg>
    );
  }
}

class ScatterPlotViz extends Component {
  static propTypes = {
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  };

  componentWillMount() {
    this.getData();
  }

  getData() {
    // each datapoint in form of [Country, year, total KCals, LifeExpect, population]
    const myData = [
      ['Canada', 2012, 2055, 83, 100],
      ['Oh Im sorry I thought this was Amurica', 2012, 2056, 76, 10],
      ['A', 2012, 2008, 91, 100],
      ['B', 2012, 2061, 78, 10],
      ['C', 2012, 2164, 88, 100],
      ['D', 2012, 2162, 64, 1],
      ['E', 2012, 2323, 76, 1],
      ['F', 2012, 2159, 78, 100],
      ['G', 2012, 2308, 59, 10],
      ['H', 2012, 2183, 86, 10],
      ['I', 2012, 2155, 89, 10],
      ['J', 2012, 2124, 79, 100],
      ['K', 2012, 2124, 74, 100],
      ['L', 2012, 2126, 76, 1],
      ['M', 2012, 2199, 58, 1],
      ['N', 2012, 2228, 99, 100],
      ['Pop: 1', 2012, 2025, 100, 1],
      ['Pop: 10', 2012, 2025, 90, 10],
      ['Pop: 50', 2012, 2025, 80, 50],
      ['Pop: 100', 2012, 2025, 70, 100],
      ['Pop: 1000', 2012, 2025, 50, 1000],
    ];
    this.setState({
      data: myData,
    });
  }

  render() {
    return (
      <Card size="small" title="Life Expectancy v. Total kcal">
        <ScatterGraph data={this.state.data} {...settings} />
      </Card>
    );
  }
}

export default withData(ScatterPlotViz);
