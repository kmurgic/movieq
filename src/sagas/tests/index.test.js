import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import sagas from '..';
import fetchTopMovies from '../../endpoints/fetchTopMovies';
import searchMovies from '../../endpoints/searchMovies';

it('fetches movies', () => {
  const fakeMovies = ['movie1', 'movie2'];

  return expectSaga(sagas, fetchTopMovies)
    .provide([
      [call(fetchTopMovies), fakeMovies],
    ])
    .put({ type: 'FETCH_MOVIES_SUCCESS', payload: fakeMovies })
    .dispatch({ type: 'FETCH_MOVIES_REQUEST' })
    .run();
});

it('handles fetch top movie errors', () => {
  const error = new Error('error');

  return expectSaga(sagas, fetchTopMovies)
    .provide([
      [matchers.call.fn(fetchTopMovies), throwError(error)],
    ])
    .put({ type: 'FETCH_MOVIES_ERROR', payload: error.message })
    .dispatch({ type: 'FETCH_MOVIES_REQUEST' })
    .run();
});

it('searches for movies', () => {
  const fakeMovies = ['movie1', 'movie2'];

  return expectSaga(sagas, searchMovies)
    .provide([
      [call(searchMovies, 'foo'), fakeMovies],
    ])
    .put({ type: 'QUERY_MOVIES_SUCCESS', payload: fakeMovies })
    .dispatch({ type: 'QUERY_MOVIES_REQUEST', payload: 'foo' })
    .run();
});

it('handles search errors', () => {
  const error = new Error('error');

  return expectSaga(sagas, searchMovies)
    .provide([
      [matchers.call.fn(searchMovies, 'foo'), throwError(error)],
    ])
    .put({ type: 'QUERY_MOVIES_ERROR', payload: error.message })
    .dispatch({ type: 'QUERY_MOVIES_REQUEST', payload: 'foo' })
    .run();
});
