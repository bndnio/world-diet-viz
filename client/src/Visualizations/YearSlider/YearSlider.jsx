import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withData } from '../../DataContext/withData';
import { Slider, Typography } from 'antd';

const { Text } = Typography;

class YearSlider extends Component {
  handleRelease = value => {
    this.props.data.setQuery({
      // Create array of all years from base year to top year
      years: [...Array(value[1] - value[0] + 1).keys()].map(v => value[0] + v),
    });
  };

  render() {
    const GET_YEAR_RANGE = gql`
      {
        yearRange {
          min
          max
        }
      }
    `;

    return (
      <Query query={GET_YEAR_RANGE}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) console.log('Error loading gql data for YearSlider');
          const { min, max } = data.yearRange;

          return (
            <div>
              <Text>Year</Text>
              <Slider
                range
                defaultValue={[min, max]}
                min={min}
                max={max}
                onAfterChange={this.handleRelease}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withData(YearSlider);
