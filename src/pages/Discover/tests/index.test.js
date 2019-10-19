import React from 'react';
import { shallow } from 'enzyme';
import Discover from '../index';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
];

const mockState = {
  discover: {
    error: false,
    firstLoad: false,
    isLoading: false,
    movies: mockMovieList,
  }
}

jest.mock('react-redux', () => ({
  useSelector: fn => fn(mockState),
}));

it('renders without crashing', () => {
  shallow(<Discover />);
});
