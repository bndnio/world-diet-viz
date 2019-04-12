import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

const Selector = props => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    props.handleChange(value);
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a Group"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {props.options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Selector;
