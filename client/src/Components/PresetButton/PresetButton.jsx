import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';

class PresetButton extends Component {
  static propTypes = {
    yearRange: PropTypes.arrayOf(PropTypes.number),
    countries: PropTypes.arrayOf(PropTypes.string),
    selectedYear: PropTypes.number,
    selectedCountry: PropTypes.string,
    children: PropTypes.string.isRequired,
  };

  handleClick = () => {
    const { yearRange, countries, selectedYear, selectedCountry } = this.props;
    let queryParams = {};
    let fields = {};

    if (!!yearRange) {
      const years = [...Array(yearRange[1] - yearRange[0] + 1).keys()].map(
        v => yearRange[0] + v
      );
      queryParams.years = years;
      fields.availableYears = years;
    }
    if (!!countries) {
      queryParams.countries = countries;
      fields.availableCountries = countries;
    }

    if (!!selectedYear) fields.selectedYear = selectedYear;
    if (!!selectedCountry) fields.selectedCountry = selectedCountry;

    if (Object.keys(queryParams).length !== 0)
      this.props.data.setQuery(queryParams);
    if (Object.keys(fields).length !== 0)
      this.props.interaction.setFields(fields);
  };

  render() {
    return <Button onClick={this.handleClick}>{this.props.children}</Button>;
  }
}

export default withInteraction(withData(PresetButton));
