import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../index';

it('renders without crashing', () => {
  shallow(<Profile />);
});
