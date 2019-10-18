import React from 'react';
import { shallow } from 'enzyme';
import MovieCardContainer from '../MovieCardContainer';
import MovieCard from '../MovieCard';
import Spinner from 'react-bootstrap/Spinner';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
  { id: 'm4' },
  { id: 'm5' },
  { id: 'm6' },
  { id: 'm7' },
  { id: 'm8' },
  { id: 'm9' },
  { id: 'm10' },
  { id: 'm11' },
  { id: 'm12' },
  { id: 'm13' },
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
let wrapper;

beforeEach(() => {
  mockState.movies = {
    isLoading: false,
    error: false,
    list: mockMovieList,
  };
});

it('renders a movie card for the first twelve movies in the list', () => {
  wrapper = shallow(<MovieCardContainer />);
  expect(wrapper.find(MovieCard).length).toEqual(12);
});

it('renders a spinner when loading', () => {
  mockState.movies.isLoading = true;
  wrapper = shallow(<MovieCardContainer />);
  expect(wrapper.find(Spinner).length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});

it('renders an error message when there is an error', () => {
  mockState.movies.error = true;
  wrapper = shallow(<MovieCardContainer />);
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});

it('renders a message when there are no movies in the list', () => {
  mockState.movies.list = [];
  wrapper = shallow(<MovieCardContainer />);
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});
