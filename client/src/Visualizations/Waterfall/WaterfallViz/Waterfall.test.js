import React from 'react';
import { shallow } from 'enzyme';
import Waterfall from './Waterfall';

describe('<Waterfall />', () => {
  test('renders', () => {
    const wrapper = shallow(<Waterfall />);
    expect(wrapper).toMatchSnapshot();
  });
});
