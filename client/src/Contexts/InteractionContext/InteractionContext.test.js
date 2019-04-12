import React from 'react';
import { shallow } from 'enzyme';
import InteractionContext from './InteractionContext';

describe('<InteractionContext />', () => {
  test('renders', () => {
    const wrapper = shallow(<InteractionContext />);
    expect(wrapper).toMatchSnapshot();
  });
});
