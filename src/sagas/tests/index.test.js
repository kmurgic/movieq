import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import sagas from '..';
import fetchTopMovies from '../../endpoints/fetchTopMovies';
import searchMovies from '../../endpoints/searchMovies';
import { fetchMoviesSuccess, fetchMoviesRequest, fetchMoviesError, queryMoviesSuccess, queryMoviesRequest, queryMoviesError, notificationRemove, notificationAdd } from '../../actions';

it('fetches movies', () => {
  const fakeMovies = ['movie1', 'movie2'];

  return expectSaga(sagas, fetchTopMovies)
    .provide([
      [call(fetchTopMovies), fakeMovies],
    ])
    .put(fetchMoviesSuccess(fakeMovies))
    .dispatch(fetchMoviesRequest())
    .run();
});

it('handles fetch top movie errors', () => {
  const error = new Error('error');

  return expectSaga(sagas, fetchTopMovies)
    .provide([
      [matchers.call.fn(fetchTopMovies), throwError(error)],
    ])
    .put(fetchMoviesError(error.message))
    .dispatch(fetchMoviesRequest())
    .run();
});

it('searches for movies', () => {
  const fakeMovies = ['movie1', 'movie2'];

  return expectSaga(sagas, searchMovies)
    .provide([
      [call(searchMovies, 'foo'), fakeMovies],
    ])
    .put(queryMoviesSuccess(fakeMovies))
    .dispatch(queryMoviesRequest('foo'))
    .run();
});

it('handles search errors', () => {
  const error = new Error('error');

  return expectSaga(sagas, searchMovies)
    .provide([
      [matchers.call.fn(searchMovies, 'foo'), throwError(error)],
    ])
    .put(queryMoviesError(error.message))
    .dispatch(queryMoviesRequest('foo'))
    .run();
});

it('removes notifications after a delay', () => {
  const id = 1;
  return expectSaga(sagas)
    .put(notificationRemove(id))
    .dispatch(notificationAdd('Success', 'Action successful.', 'success', id))
    .run(2500);
});
