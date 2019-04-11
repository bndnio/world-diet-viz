import * as React from 'react';
import { DataContext } from './data-context';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export default class DataProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setDate: this.setData,
      data: [],
      queryParams: {
        type: 'MACRO',
        countries: ['Canada'],
        years: [],
      },
    };
    this.client = new ApolloClient({
      uri: 'http://gql.healthviz.xyz/graphql',
    });
    this.getData();
  }

  setQuery = nextQuery => {
    this.setState(state => ({
      queryParams: {
        ...state.queryParams,
        ...nextQuery,
      },
    }));
  };

  setData = nextData => {
    // save data to state
    this.setState(state => ({ data: nextData }));
  };

  getData = () => {
    const { years, countries, type } = this.state.queryParams;
    this.client
      .query({
        query: gql`
          {
            itemByYearCountry(
              ${years.length > 0 ? `years:${JSON.stringify(years)}, ` : ''}
              ${
                countries.length > 0
                  ? `countries:${JSON.stringify(countries)}, `
                  : ''
              }
              ${!!type ? `type:${type}` : ''}
            )
              {
              year
              countries {
                country
                items {
                  country
                  year
                  type
                  key
                  value
                }
              }
            }
          }
        `,
      })
      .then(result => this.setData(result.data.itemByYearCountry));
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
