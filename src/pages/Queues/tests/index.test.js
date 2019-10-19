import React from 'react';
import { shallow } from 'enzyme';
import Queues from '../index';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
];

const mockState = {
  queues: {
    queueList: [{
      id: 1,
      movies: mockMovieList,
    }],
  }
};

jest.mock('react-redux', () => ({
  useSelector: fn => fn(mockState),
}));

it('renders without crashing', () => {
  shallow(<Queues />);
});
