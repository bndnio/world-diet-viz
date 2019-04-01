import React from 'react';
import { shallow } from 'enzyme';
import ScatterPlot from './ScatterPlot';

describe('<ScatterPlot />', () => {
  test('renders', () => {
    const wrapper = shallow(<ScatterPlot />);
    expect(wrapper).toMatchSnapshot();
  });
});
