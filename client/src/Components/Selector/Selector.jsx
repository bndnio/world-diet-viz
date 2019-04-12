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
      {...props}
      showSearch
      style={{ width: 200 }}
      placeholder={props.placeholder || 'Select one'}
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
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType(
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    )
  ).isRequired,
};

export default Selector;
