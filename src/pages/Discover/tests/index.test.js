import React from 'react';
import { shallow } from 'enzyme';
import Discover from '../index';

const mockMovieList = [
  'm1',
  'm2',
  'm3',
];

const mockState = {
  movies: {
    isLoading: false,
    error: false,
    list: mockMovieList,
  }
}

jest.mock('react-redux', () => ({
  useSelector: fn => fn(mockState),
}))
it('renders without crashing', () => {
  shallow(<Discover />);
});
