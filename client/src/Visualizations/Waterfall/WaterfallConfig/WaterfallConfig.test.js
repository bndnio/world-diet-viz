import React from 'react';
import { shallow } from 'enzyme';
import WaterfallConfig from './WaterfallConfig';

describe('<WaterfallConfig />', () => {
  test('renders', () => {
    const wrapper = shallow(<WaterfallConfig />);
    expect(wrapper).toMatchSnapshot();
  });
});
