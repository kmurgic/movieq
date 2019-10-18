import React from 'react';
import { shallow } from 'enzyme';
import MovieCardContainer from '../index';
import MovieCard from '../../MovieCard';
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

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <MovieCardContainer
      error={false}
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
