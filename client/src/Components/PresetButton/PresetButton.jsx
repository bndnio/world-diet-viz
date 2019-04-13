import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';

class PresetButton extends Component {
  static propTypes = {
    queryParams: PropTypes.shape({
      years: PropTypes.arrayOf(PropTypes.number),
      countries: PropTypes.arrayOf(PropTypes.string),
    }),
    fields: {
      availableYears: PropTypes.arrayOf(PropTypes.number),
      availableCountries: PropTypes.arrayOf(PropTypes.string),
      selectedYear: PropTypes.number,
      selectedCountry: PropTypes.string,
    },
    children: PropTypes.string.isRequired,
  };

  handleClick = () => {
    if (!!this.props.queryParams)
      this.props.data.setQuery(this.props.queryParams);
    if (!!this.props.fields)
      this.props.interaction.setFields(this.props.fields);
  };

  render() {
    return <Button onClick={this.handleClick}>{this.props.children}</Button>;
  }
}

export default withInteraction(withData(PresetButton));
