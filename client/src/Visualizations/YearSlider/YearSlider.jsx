import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withData } from '../../Contexts/DataContext/withData';
import { withInteraction } from '../../Contexts/InteractionContext/withInteraction';
import { Slider, Typography } from 'antd';

const { Text } = Typography;

class MySlider extends Component {
  constructor(props) {
    super(props);
    const { min, max } = this.props;
    this.handleRelease([min, max]);
    this.state = {
      value: [min, max],
    };
  }

  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    interaction: PropTypes.shape({
      setFields: PropTypes.func.isRequired,
    }).isRequired,
    data: PropTypes.shape({
      setQuery: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidUpdate(prevProps) {
    const { availableYears } = this.props.interaction.fields;
    if (prevProps.interaction.fields.availableYears !== availableYears) {
      this.setState({
        value: [availableYears[0], availableYears[availableYears.length - 1]],
      });
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

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
    const { min, max } = this.props;

    return (
      <div>
        <Text>Year</Text>
        <Slider
          range
          min={min}
          max={max}
          onChange={this.handleChange}
          onAfterChange={this.handleRelease}
          value={this.state.value}
        />
      </div>
    );
  }
}

class YearSlider extends Component {
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

          return <MySlider {...this.props} min={min} max={max} />;
        }}
      </Query>
    );
  }
}

export default withInteraction(withData(YearSlider));
