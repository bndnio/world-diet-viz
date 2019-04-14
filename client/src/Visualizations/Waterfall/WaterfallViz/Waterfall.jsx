import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Card, Icon } from 'antd';
import MacroNameMap from '../../../Modules/MacroNameMap';

import './Waterfall.css';

const MODE = ['ALIGN', 'FOLLOW'];

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
    settings: PropTypes.shape({
      width: PropTypes.number,
      padding: PropTypes.number,
    }),
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  render() {
    const {
      settings: { padding, width, height, mode },
    } = this.props;
    return (
      <g className="xy-axis">
        <Axis
          translate={`translate(0, ${padding})`}
          scale={this.props.xScale}
          orient="top"
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={`translate(${width / 2}, 15)`}
        >
          [kCal / person / day]
        </text>
        <Axis
          translate={
            mode === MODE[1]
              ? `translate(${padding}, 0)`
              : `translate(${width / 2}, 0)`
          }
          scale={this.props.yScale}
          orient="left"
        />
        <text
          className="axis"
          textAnchor="middle"
          transform={
            mode === MODE[1]
              ? `translate(${padding}, ${height - padding + 20}), rotate(-90)`
              : `translate(${width / 2}, ${height - padding + 15})`
          }
        >
          [year]
        </text>
      </g>
    );
  }
}

class DataRectangles extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      numDataPoints: PropTypes.number,
    }),
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  renderRect = coord => {
    const { settings } = this.props;

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
    const { settings } = this.props;
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
        {coord.xDiff.toFixed(1)}
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

class WaterfallPlot extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      baseYear: PropTypes.number,
      numDataPoints: PropTypes.number,
      maxRange: PropTypes.func,
    }),
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  };

  getXScale = () => {
    const { settings } = this.props;

    if (settings.mode === MODE[0]) {
      var xMin = d3.min(this.props.data, d => d.xDiff);
      var xMax = d3.max(this.props.data, d => d.xDiff);
    } else if (settings.mode === MODE[1]) {
      xMin = d3.min(this.props.data.map(d => [d.xAbs, d.xLast]).flat());
      xMax = d3.max(this.props.data.map(d => [d.xAbs, d.xLast]).flat());
    }

    const absMax = d3.max([Math.abs(xMin), Math.abs(xMax)]);
    return d3
      .scaleLinear()
      .domain([settings.mode === MODE[0] ? -absMax : xMin, absMax])
      .range([settings.padding, settings.width - settings.padding]);
  };

  getYScale = () => {
    const { settings } = this.props;

    const yMin = d3.min(this.props.data, d => d.year);
    const yMax = d3.max(this.props.data, d => d.year);

    return d3
      .scaleLinear()
      .domain([yMin, yMax + 1])
      .range([settings.padding, settings.height - settings.padding]);
  };

  render() {
    const { settings } = this.props;

    const xScale = this.props.xScale || this.getXScale();
    const yScale = this.props.xScale || this.getYScale();

    return (
      <svg width={settings.width} height={settings.height}>
        <DataRectangles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    );
  }
}

class Waterfall extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      padding: PropTypes.number,
      baseYear: PropTypes.number,
      numDataPoints: PropTypes.number,
      maxRange: PropTypes.func,
    }),
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  };
  static defaultProps = {
    settings: {
      width: 300,
      height: 400,
      padding: 40,
      baseYear: 1985,
      numDataPoints: 30,
      maxRange: () => Math.random() * 100,
    },
  };

  state = {
    mode: MODE[1],
    data: [],
  };

  componentWillMount() {
    this.processData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.processData();
  }

  toggleMode = () => {
    const { mode } = this.state;
    if (mode === MODE[0]) this.setState({ mode: MODE[1] });
    else if (mode === MODE[1]) this.setState({ mode: MODE[0] });
  };

  processData = () => {
    const nextData = this.props.data
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
    this.setState({ data: nextData });
  };

  render() {
    const { settings, country, group } = this.props;

    return (
      <Card
        size="small"
        bodyStyle={{ width: 324, height: 424 }}
        title={`${country} - ${MacroNameMap[group]}`}
        extra={
          <div className="vizMenuExtra">
            <Icon type="swap" theme="outlined" onClick={this.toggleMode} />
            <Icon
              type="setting"
              theme="filled"
              onClick={this.props.toggleView}
            />
            <Icon
              type="close"
              theme="outlined"
              onClick={this.props.handleClose}
            />
          </div>
        }
      >
        <WaterfallPlot
          data={this.state.data}
          settings={{
            ...settings,
            numDataPoints: this.state.data.length + 1,
            mode: this.state.mode,
          }}
        />
      </Card>
    );
  }
}

export default Waterfall;
