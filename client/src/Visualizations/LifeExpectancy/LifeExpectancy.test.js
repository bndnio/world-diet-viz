import React from 'react';
import { shallow } from 'enzyme';
import LifeExpectancy from './LifeExpectancy';

describe('<LifeExpectancy />', () => {
  test('renders', () => {
    const wrapper = shallow(<LifeExpectancy />);
    expect(wrapper).toMatchSnapshot();
  });
});
