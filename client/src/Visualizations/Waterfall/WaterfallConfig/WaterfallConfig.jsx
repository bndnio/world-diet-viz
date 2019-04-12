import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Selector from '../../../Components/Selector';
import MacroNameMap from '../../../Modules/MacroNameMap';

class WaterfallConfig extends Component {
  render() {
    // placeholder
    // const {interaction} = this.props
    const interaction = {
      availableYears: [1960, 1961],
      availableCountries: ['Canada', 'Mexico'],
    };

    const GET_GROUP_OPTIONS = gql`
      {
        names(type: MACRO)
      }
    `;

    const handleChange = type => value => {
      this.props.handleChange({ [type]: value });
    };

    return (
      <Query query={GET_GROUP_OPTIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) console.log('Error loading gql data for YearSlider');

          return (
            <div>
              WaterfallConfig
              <Selector
                placeholder="Select a country"
                options={interaction.availableCountries}
                handleChange={handleChange('country')}
              />
              <Selector
                placeholder="Select a group"
                options={data.names.map(name => MacroNameMap[name])}
                handleChange={handleChange('group')}
              />
              <Selector
                placeholder="Select a year"
                options={interaction.availableYears}
                handleChange={handleChange('year')}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

WaterfallConfig.propTypes = {};

export default WaterfallConfig;