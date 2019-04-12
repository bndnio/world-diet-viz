import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WaterfallConfig.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withInteraction } from '../../../Contexts/InteractionContext/withInteraction';
import Selector from '../../../Components/Selector';
import MacroNameMap from '../../../Modules/MacroNameMap';
import { Button } from 'antd';

class WaterfallConfig extends Component {
  render() {
    const {
      availableCountries,
      availableYears,
    } = this.props.interaction.fields;

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
            <div className="WaterfallConfig">
              <h3>Config</h3>
              <Selector
                placeholder="Select a country"
                options={availableCountries}
                handleChange={handleChange('country')}
              />
              <Selector
                placeholder="Select a group"
                options={data.names.map(name => MacroNameMap[name])}
                handleChange={handleChange('group')}
              />
              <Selector
                placeholder="Select a year"
                options={availableYears}
                handleChange={handleChange('year')}
              />
              <Button type="primary" onClick={this.props.toggleView}>
                Visualize
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}

WaterfallConfig.propTypes = {
  toggleView: PropTypes.func.isRequired,
  interaction: PropTypes.shape({
    fields: PropTypes.shape({
      availableCountries: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
      availableYears: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withInteraction(WaterfallConfig);
