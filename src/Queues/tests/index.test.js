import React from 'react';
import { shallow } from 'enzyme';
import Queues from '../index';

it('renders without crashing', () => {
  shallow(<Queues />);
});
