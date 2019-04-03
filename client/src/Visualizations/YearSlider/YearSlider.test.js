import React from 'react';
import { shallow } from 'enzyme';
import YearSlider from './YearSlider';

describe('<YearSlider />', () => {
  test('renders', () => {
    const wrapper = shallow(<YearSlider />);
    expect(wrapper).toMatchSnapshot();
  });
});
