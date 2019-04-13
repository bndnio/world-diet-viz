import React from 'react';
import { shallow } from 'enzyme';
import YearRangeSlider from './YearRangeSlider';

describe('<YearRangeSlider />', () => {
  test('renders', () => {
    const wrapper = shallow(<YearRangeSlider />);
    expect(wrapper).toMatchSnapshot();
  });
});
