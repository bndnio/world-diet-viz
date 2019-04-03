import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from '../../DataContext/withData';
import { Slider, Typography } from 'antd';

const { Text } = Typography;

class YearSlider extends Component {
  static propTypes = {
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
  };

  static defaultProps = {
    lowerBound: 1960,
    upperBound: 2013,
  };

  handleChange = value => {
    // need to update withData
  };
  render() {
    const { lowerBound, upperBound } = this.props;

    return (
      <div>
        <Text>Year</Text>
        <Slider
          range
          defaultValue={[lowerBound, upperBound]}
          min={lowerBound}
          max={upperBound}
          // tooltipVisible={true}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withData(YearSlider);
