import React from 'react';
import { shallow } from 'enzyme';
import VisualizationBase from './VisualizationBase';

describe('<VisualizationBase />', () => {
  test('renders', () => {
    const wrapper = shallow(<VisualizationBase />);
    expect(wrapper).toMatchSnapshot();
  });
});
