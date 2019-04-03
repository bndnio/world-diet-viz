import React from 'react';
import { shallow } from 'enzyme';
import CountryPicker from './CountryPicker';

describe('<CountryPicker />', () => {
  test('renders', () => {
    const wrapper = shallow(<CountryPicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
