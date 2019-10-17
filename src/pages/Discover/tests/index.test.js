import React from 'react';
import { shallow } from 'enzyme';
import Discover from '../index';

it('renders without crashing', () => {
  shallow(<Discover />);
});
