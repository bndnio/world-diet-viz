import React from 'react';
import { shallow } from 'enzyme';
import VisualizationContainer from './VisualizationContainer';

describe('<VisualizationContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<VisualizationContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
