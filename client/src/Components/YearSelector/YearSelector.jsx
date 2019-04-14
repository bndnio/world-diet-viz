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

  componentDidUpdate(prevProps) {
    this.catchOutOfBoundsYear();
  }

  catchOutOfBoundsYear() {
    const { selectedYear, availableYears } = this.props.interaction.fields;

    if (!selectedYear && availableYears.length > 0) {
      this.props.interaction.setFields({
        selectedYear: availableYears[0],
      });
    }
    if (availableYears[0] > selectedYear) {
      this.handleChange(availableYears[0]);
    }
    if (availableYears[availableYears.length - 1] < selectedYear) {
      this.handleChange(availableYears[availableYears.length - 1]);
    }
  }

  handleChange = value => {
    this.props.interaction.setFields({
      selectedYear: value,
    });
  };

  render() {
    const { availableYears, selectedYear } = this.props.interaction.fields;
    const min = availableYears[0];
    const max = availableYears[availableYears.length - 1];

    return (
      <Slider
        min={min}
        max={max}
        marks={{ [min]: min, [max]: max }}
        onChange={this.handleChange}
        onAfterChange={this.handleRelease}
        value={selectedYear || min}
        style={{ width: 100 }}
        disabled={this.props.disabled}
      />
    );
  }
}

export default withInteraction(withData(YearSelector));
