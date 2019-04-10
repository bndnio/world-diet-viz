import React from 'react';
import { shallow } from 'enzyme';
import LineChart from './LineChart.test';

describe('<LineChart />', () => {
  test('renders', () => {
    const wrapper = shallow(<LineChart />);
    expect(wrapper).toMatchSnapshot();
  });
});
