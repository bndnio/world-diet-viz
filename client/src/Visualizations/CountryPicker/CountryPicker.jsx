import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';
import { Select, Typography } from 'antd';

const { Text } = Typography;

const Option = Select.Option;

class CountryPicker extends Component {
  handleChange = value => {
    this.props.data.setQuery({ countries: value || [] });
    this.props.interaction.setFields({ availableCountries: value || [] });
  };

  render() {
    const GET_COUNTRIES = gql`
      {
        countries
      }
    `;

    return (
      <Query query={GET_COUNTRIES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error)
            return console.log('Error loading gql data for CountryPicker');
          const { countries } = data;

          return (
            <div>
              <Text>Country</Text>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={this.handleChange}
                value={this.props.interaction.fields.availableCountries}
              >
                {countries.map(country => (
                  <Option key={country}>{country}</Option>
                ))}
              </Select>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withInteraction(withData(CountryPicker));
