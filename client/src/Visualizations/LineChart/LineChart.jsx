import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as d3 from 'd3';
import Color from 'color';
import { Card } from 'antd';
import Selector from '../../Components/Selector';
import MacroNameMap from '../../Modules/MacroNameMap';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';

import './LineChart.css';

const settings = {
  width: 900,
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
          translate={`translate(0, ${this.props.height - this.props.padding})`}
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

class Line extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderLine = (coords, index) => {
    return (
      <line
        x1={this.props.xScale(coords[0])}
        y1={this.props.yScale(coords[1])}
        x2={this.props.xScale(coords[2])}
        y2={this.props.yScale(coords[3])}
        strokeWidth={1.5}
        stroke={this.props.color}
        key={index}
      />
    );
  };

  render() {
    return <g>{this.props.data.map(this.renderLine)}</g>;
  }
}

// To be used later with interaction
// class DataCircles extends React.Component {
//   static propTypes = {
//     xScale: PropTypes.func.isRequired,
//     yScale: PropTypes.func.isRequired,
//   };

//   renderCircle(coords) {
//     return (
//       <circle
//         cx={this.props.xScale(coords[2])}
//         cy={this.props.yScale(coords[3])}
//         r={3}
//         key={Math.random()}
//         fill={this.props.color}
//       />
//     );
//   }

//   render() {
//     return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>;
//   }
// }

class FilledSeries extends Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
  };

  render() {
    const { xScale, yScale, data, color } = this.props;
    return (
      <React.Fragment>
        <FillBottom xScale={xScale} yScale={yScale} data={data} color={color} />
        <Line
          xScale={xScale}
          yScale={yScale}
          data={data}
          color={Color(color).darken(0.1)}
        />
      </React.Fragment>
    );
  }
}

class FillBottom extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderFillBottom = (coords, index) => {
    return (
      <polygon
        points={`
        ${this.props.xScale(coords[0])},${this.props.yScale(0)}
        ${this.props.xScale(coords[2])},${this.props.yScale(0)}
        ${this.props.xScale(coords[2])},${this.props.yScale(coords[3])}
        ${this.props.xScale(coords[0])},${this.props.yScale(coords[1])}
        `}
        fill={this.props.color}
        key={index}
      />
    );
  };

  render() {
    return <g>{this.props.data.map(this.renderFillBottom)}</g>;
  }
}

class FillBottom extends React.Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderFillBottom(coords) {
    return (
      <polygon
        points={`
        ${this.props.xScale(coords[0])},${this.props.yScale(0)}
        ${this.props.xScale(coords[2])},${this.props.yScale(0)}
        ${this.props.xScale(coords[2])},${this.props.yScale(coords[3])}
        ${this.props.xScale(coords[0])},${this.props.yScale(coords[1])}
        `}
        fill={this.props.color}
      />
    );
  }

  render() {
    return <g>{this.props.data.map(this.renderFillBottom.bind(this))}</g>;
  }
}

class LineGraph extends React.Component {
  static propTypes = {
    padding: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    kcalMax: PropTypes.number.isRequired,
  };

  getXScale() {
    const { availableYears } = this.props.interaction.fields;
    const minYear = availableYears[0];
    const maxYear = availableYears[availableYears.length - 1];

    return d3
      .scaleLinear()
      .domain([minYear, maxYear])
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getDataYScale() {
    return d3
      .scaleLinear()
      .domain([0, this.props.kcalMax])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }
  getDeathYScale() {
    return d3
      .scaleLinear()
      .domain([20, 80])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() {
    const xScale = this.getXScale();
    const yDataScale = this.getDataYScale();
    const yDeathDataScale = this.getDeathYScale();

    return (
      <svg width={this.props.width} height={this.props.height}>
        <FilledSeries
          xScale={xScale}
          yScale={yDataScale}
          data={this.props.measure4}
          color="#70b678"
        />
        <FilledSeries
          xScale={xScale}
          yScale={yDataScale}
          data={this.props.measure3}
          color="#bbdbad"
        />
        <FilledSeries
          xScale={xScale}
          yScale={yDataScale}
          data={this.props.measure2}
          color="#c79fc8"
        />
        <FilledSeries
          xScale={xScale}
          yScale={yDataScale}
          data={this.props.measure1}
          color="#f4a58a"
        />
        <Line
          xScale={xScale}
          yScale={yDeathDataScale}
          {...this.props}
          data={this.props.deathData}
          color="#444444"
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
    this.processData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data.data !== this.props.data.data ||
      prevProps.interaction.fields.selectedCountry !==
        this.props.interaction.fields.selectedCountry
    ) {
      this.processData();
    }
  }

  processData() {
    // each datapoint in form of [year, totalKCal, measure1, measure2, measure3]
    const { selectedCountry } = this.props.interaction.fields;
    let nextData = [];
    if (!!selectedCountry) {
      nextData = this.props.data.data.map(d => [
        d.year,
        d.countries
          .filter(c => c.country === selectedCountry)[0]
          .items.reduce(
            (acc, item) => ({
              ...acc,
              [MacroNameMap[item.name]]: item.value,
            }),
            {}
          ),
      ]);
    }

    this.setState({
      data: nextData,
      // x1, y1, x2, y2
      totalData: nextData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[1]['Grand Total'],
              arr[i - 1][0],
              arr[i - 1][1]['Grand Total'],
            ];
        })
        .filter(d => !!d),
      deathData: nextData
        .map(d => [d[0], 65 + (Math.random() - 0.5) * 10])
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else return [yr[0], yr[1], arr[i - 1][0], arr[i - 1][1]];
        })
        .filter(d => !!d),
      carbData: nextData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[1]['Carbs'],
              arr[i - 1][0],
              arr[i - 1][1]['Carbs'],
            ];
        })
        .filter(d => !!d),
      fatData: nextData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[1]['Carbs'] + yr[1]['Fat'],
              arr[i - 1][0],
              arr[i - 1][1]['Carbs'] + arr[i - 1][1]['Fat'],
            ];
        })
        .filter(d => !!d),
      animalProteinData: nextData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[1]['Carbs'] + yr[1]['Fat'] + yr[1]['Animal Protein'],
              arr[i - 1][0],
              arr[i - 1][1]['Carbs'] +
                arr[i - 1][1]['Fat'] +
                arr[i - 1][1]['Animal Protein'],
            ];
        })
        .filter(d => !!d),
      plantProteinData: nextData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[1]['Carbs'] +
                yr[1]['Fat'] +
                yr[1]['Animal Protein'] +
                yr[1]['Plant Protein'],
              arr[i - 1][0],
              arr[i - 1][1]['Carbs'] +
                arr[i - 1][1]['Fat'] +
                arr[i - 1][1]['Animal Protein'] +
                arr[i - 1][1]['Plant Protein'],
            ];
        })
        .filter(d => !!d),
      measure1: myData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else return [yr[0], yr[2], [arr[i - 1][0]], [arr[i - 1][2]]];
        })
        .filter(d => !!d),
      measure2: myData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[2] + yr[3],
              [arr[i - 1][0]],
              [arr[i - 1][2] + arr[i - 1][3]],
            ];
        })
        .filter(d => !!d),
      measure3: myData
        .map((yr, i, arr) => {
          if (i === 0) return undefined;
          else
            return [
              yr[0],
              yr[2] + yr[3] + yr[4],
              [arr[i - 1][0]],
              [arr[i - 1][2] + arr[i - 1][3] + arr[i - 1][4]],
            ];
        })
        .filter(d => !!d),
    });
  }

  render() {
    const GET_YEAR_RANGE = gql`
      {
        kcalRange {
          max
        }
      }
    `;

    return (
      <Card
        title={
          <div className="vizMenuBar">
            <span>Life Expectancy v. Total kCal Consumption</span>
            <Selector
              options={this.props.interaction.fields.availableCountries || []}
              handleChange={value =>
                this.props.interaction.setFields({
                  selectedCountry: value,
                })
              }
              disabled={
                !!this.props.data.loading ||
                !this.props.interaction.fields.availableCountries
              }
              placeholder="Select Country"
            />
          </div>
        }
      >
        <Query query={GET_YEAR_RANGE}>
          {({ loading, error, data }) => {
            if (this.props.data.loading || loading) return 'Loading...';
            if (error) console.log('Error loading gql data for LineChart');
            const { max } = data.kcalRange;

            if (!this.props.interaction.fields.selectedCountry)
              return 'select a country';
            return (
              <LineGraph
                {...this.props}
                data={this.state.totalData}
                deathData={this.state.deathData}
                measure1={this.state.carbData}
                measure2={this.state.fatData}
                measure3={this.state.animalProteinData}
                measure4={this.state.plantProteinData}
                kcalMax={max}
                {...settings}
              />
            );
          }}
        </Query>
      </Card>
    );
  }
}

export default withInteraction(withData(LineChart));
