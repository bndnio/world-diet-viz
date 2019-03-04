import React from 'react';
import { shallow } from 'enzyme';
import VisualizationBoard from './VisualizationBoard';

describe('<VisualizationBoard />', () => {
  test('renders', () => {
    const wrapper = shallow(<VisualizationBoard />);
    expect(wrapper).toMatchSnapshot();
  });
});
