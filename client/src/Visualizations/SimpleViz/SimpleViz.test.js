import React from 'react';
import { shallow } from 'enzyme';
import SimpleViz from './SimpleViz';

describe('<SimpleViz />', () => {
  test('renders', () => {
    const wrapper = shallow(<SimpleViz />);
    expect(wrapper).toMatchSnapshot();
  });
});
