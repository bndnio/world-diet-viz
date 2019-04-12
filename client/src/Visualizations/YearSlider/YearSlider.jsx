import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';
import { Slider, Typography } from 'antd';

const { Text } = Typography;

class YearSlider extends Component {
  handleRelease = value => {
    // Create array of all years from base year to top year
    const selectedYears = [...Array(value[1] - value[0] + 1).keys()].map(
      v => value[0] + v
    );
    this.props.data.setQuery({
      years: selectedYears,
    });
    this.props.interaction.setFields({
      availableYears: selectedYears,
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

export default withInteraction(withData(YearSlider));
