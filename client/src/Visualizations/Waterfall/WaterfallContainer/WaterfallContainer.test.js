import React from 'react';
import { shallow } from 'enzyme';
import WaterfallContainer from './WaterfallContainer';

describe('<WaterfallContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<WaterfallContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
