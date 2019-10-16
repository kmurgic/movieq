import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../index';

it('renders without crashing', () => {
  shallow(<Navigation />);
});