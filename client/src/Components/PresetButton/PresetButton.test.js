import React from 'react';
import { shallow } from 'enzyme';
import PresetButton from './PresetButton';

describe('<PresetButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<PresetButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
