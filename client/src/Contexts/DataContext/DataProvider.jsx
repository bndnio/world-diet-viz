import * as React from 'react';
import { DataContext } from './data-context';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';

export default class DataProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      setDate: this.setData,
      setQuery: this.setQuery,
      data: [],
      queryParams: {
        type: 'MACRO',
        countries: [],
        years: [],
      },
      loading: true,
    };
    this.client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      // uri: 'http://gql.healthviz.xyz/graphql',
    });
    this.getData();
  }

  setQuery = async nextQuery => {
    await this.setState(state => ({
      queryParams: {
        ...state.queryParams,
        ...nextQuery,
      },
    }));
    this.getData();
  };

  setData = nextData => {
    // save data to state
    this.setState({ data: nextData, loading: false });
    console.log('setData', nextData);
  };

  getData = () => {
    const { years, countries, type } = this.state.queryParams;
    console.log(this.state.queryParams);
    this.setState({ loading: true });
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
                  name
                  value
                }
              }
            }
          }
        `,
      })
      .then(result => this.setData(result.data.itemByYearCountry))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        <ApolloProvider client={this.client}>
          {this.props.children}
        </ApolloProvider>
      </DataContext.Provider>
    );
  }
}