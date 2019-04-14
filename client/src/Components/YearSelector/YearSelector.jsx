import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';
import { Slider } from 'antd';

import './YearSelector.css';

class YearSelector extends Component {
  static propTypes = {
    interaction: PropTypes.shape({
      setFields: PropTypes.func.isRequired,
      fields: PropTypes.shape({
        availableYears: PropTypes.arrayOf(PropTypes.number).isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.interaction.fields.availableYears[0],
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedYear, availableYears } = this.props.interaction.fields;
    if (prevProps.interaction.fields.selectedYear !== selectedYear) {
      this.setState({
        value: selectedYear,
      });
    }
    if (availableYears[0] > selectedYear) {
      this.setState({
        value: availableYears[0],
      });
      this.handleRelease(availableYears[0]);
    }
    if (availableYears[availableYears.length - 1] < selectedYear) {
      this.setState({
        value: availableYears[availableYears.length - 1],
      });
      this.handleRelease(availableYears[availableYears.length - 1]);
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

  handleRelease = value => {
    this.props.interaction.setFields({
      selectedYear: value,
    });
  };

  render() {
    const { availableYears } = this.props.interaction.fields;
    const min = availableYears[0];
    const max = availableYears[availableYears.length - 1];

    return (
      <Slider
        min={min}
        max={max}
        marks={{ [min]: min, [max]: max }}
        onChange={this.handleChange}
        onAfterChange={this.handleRelease}
        value={this.state.value}
        style={{ width: 100 }}
      />
    );
  }
}

export default withInteraction(withData(YearSelector));
