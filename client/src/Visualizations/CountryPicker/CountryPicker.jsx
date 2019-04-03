import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withData } from '../../DataContext/withData';
import { Select, Typography } from 'antd';

const { Text } = Typography;

const Option = Select.Option;

class CountryPicker extends Component {
  static propTypes = {
    countries: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  static defaultProps = {
    countries: ['Canada', 'Murica', 'China', 'Mexico', 'Costa Rica'],
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { countries } = this.props;

    return (
      <div>
        <Text>Country</Text>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={this.handleChange}
        >
          {countries.map(country => (
            <Option key={country}>{country}</Option>
          ))}
        </Select>
      </div>
    );
  }
}

export default withData(CountryPicker);
