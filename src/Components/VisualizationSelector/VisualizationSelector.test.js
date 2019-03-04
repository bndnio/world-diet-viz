import React from 'react';
import { shallow } from 'enzyme';
import VisualizationSelector from './VisualizationSelector';

describe('<VisualizationSelector />', () => {
  test('renders', () => {
    const wrapper = shallow(<VisualizationSelector />);
    expect(wrapper).toMatchSnapshot();
  });
});
