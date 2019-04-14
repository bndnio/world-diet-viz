import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as d3 from 'd3';
import { Card } from 'antd';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';
import MacroNameMap from '../../Modules/MacroNameMap';
import YearSelector from '../../Components/YearSelector';

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
    this.state = { hovered: undefined };
  }

  getCircleRadius = value => {
    return Math.sqrt(value / Math.PI) * 2.5;
  };

  renderCircle = (coords, index) => {
    return (
      <svg>
        <circle
          cx={this.props.xScale(coords[2])}
          cy={this.props.yScale(coords[3])}
          r={3}
          // r={this.getCircleRadius(coords[4])}
          key={index}
          fill={this.state.hovered === index ? 'red' : this.props.color}
          onMouseOver={() => this.setState({ hovered: index })}
          onMouseOut={() => this.setState({ hovered: undefined })}
        />
        <text
          className="data_labels"
          x={this.props.xScale(coords[2])}
          // x={this.props.xScale(coords[2]) + this.getCircleRadius(coords[4])}
          y={this.props.yScale(coords[3]) - 3}
        >
          {coords[0]}
        </text>
      </svg>
    );
  };

  render() {
    return <g>{this.props.data.map(this.renderCircle)}</g>;
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
      .domain(this.props.xRange) // When data begins, ends
      .range([this.props.padding, this.props.width - this.props.padding / 2]);
  }

  getDataYScale() {
    return d3
      .scaleLinear()
      .domain(this.props.yRange)
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

  state = { data: [] };

  componentDidUpdate(prevProps) {
    if (
      prevProps.data.data !== this.props.data.data ||
      prevProps.interaction.fields.availableCountries !==
        this.props.interaction.fields.availableCountries ||
      prevProps.interaction.fields.selectedYear !==
        this.props.interaction.fields.selectedYear
    ) {
      this.processData();
    }
  }

  processData() {
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
    const { availableCountries } = this.props.interaction.fields;
    let nextData = [];

    if (this.props.data.data.length !== 0 && availableCountries.length !== 0) {
      nextData = this.props.data.data
        .map(d => [
          d.year,
          d.countries
            .filter(c => availableCountries.includes(c.country))
            .map(c =>
              c.items.reduce(
                (acc, item) => ({
                  ...acc,
                  [MacroNameMap[item.name]]: item.value,
                  lifeExp: item.lifeExp,
                }),
                { country: c.country, year: d.year }
              )
            ),
        ])
        .filter(
          yr => yr[0] === this.props.interaction.fields.selectedYear
        )[0][1]
        .map(c => [c.country, c.year, c['Grand Total'], c.lifeExp]);
    }

    this.setState({
      data: nextData || [],
    });
  }

  render() {
    const GET_RANGES = gql`
      {
        kcalRange {
          min
          max
        }
        lifeExpRange(countries: ${JSON.stringify(
          this.props.interaction.fields.availableCountries
        )}) {
          min
          max
        }
      }
    `;

    return (
      <div id="scatterplot">
        <Card
          size="small"
          bodyStyle={{ width: 524, height: 424 }}
          title="Life Expectancy v. Total kcal"
          extra={<YearSelector disabled={!!this.props.data.loading} />}
        >
          <Query query={GET_RANGES}>
            {({ loading, error, data }) => {
              if (loading || this.props.data.loading) return 'Loading...';
              if (error)
                console.log('Error loading gql data for WaterfallConfig');

              const { kcalRange, lifeExpRange } = data;
              return (
                <ScatterGraph
                  data={this.state.data}
                  xRange={[kcalRange.min, kcalRange.max]}
                  yRange={[lifeExpRange.min, lifeExpRange.max]}
                  {...settings}
                />
              );
            }}
          </Query>
        </Card>
      </div>
    );
  }
}

export default withInteraction(withData(ScatterPlotViz));
