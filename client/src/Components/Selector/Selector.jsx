import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

const Selector = props => {
  function handleChange(value) {
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
        <Option key={option.value || index} value={option.value || option}>
          {option.display || option}
        </Option>
      ))}
    </Select>
  );
};

Selector.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        display: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ]).isRequired
  ).isRequired,
};

export default Selector;
