import React from 'react';
import { shallow } from 'enzyme';
import MovieCardContainer from '../index';
import MovieCard from '../../MovieCard';
import Spinner from 'react-bootstrap/Spinner';

const mockMovieList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
];

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <MovieCardContainer
      error={false}
      firstLoad={false}
      isLoading={false}
      movies={mockMovieList}
    />);
});

it('renders', () => {
  expect(wrapper);
});
it('renders a movie card for the first twelve movies in the list', () => {
  expect(wrapper.find(MovieCard).length).toEqual(12);
});

it('renders a spinner when loading', () => {
  wrapper.setProps({ isLoading: true });
  expect(wrapper.find(Spinner).length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});

it('renders an error message when there is an error', () => {
  wrapper.setProps({ error: true });
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});

it('renders a message when there are no movies in the list', () => {
  wrapper.setProps({ movies: [] });
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});

it('renders an empty fragment on first load (before any data has been fetched)', () => {
  wrapper.setProps({ firstLoad: true, movies: [] });
  expect(wrapper.find('p').length).toEqual(0);
  expect(wrapper.find(Spinner).length).toEqual(0);
  expect(wrapper.find(MovieCard).length).toEqual(0);
});
