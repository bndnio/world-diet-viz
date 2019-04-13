import React from 'react';
import { shallow } from 'enzyme';
import Selector from './Selector';

describe('<Selector />', () => {
  test('renders', () => {
    const wrapper = shallow(<Selector />);
    expect(wrapper).toMatchSnapshot();
  });
});
