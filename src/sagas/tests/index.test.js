import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import sagas from '..';
import fetchTopMovies from '../../endpoints/fetchTopMovies';

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

it('handles errors', () => {
  const error = new Error('error');

  return expectSaga(sagas, fetchTopMovies)
    .provide([
      [matchers.call.fn(fetchTopMovies), throwError(error)],
    ])
    .put({ type: 'FETCH_MOVIES_ERROR', payload: error.message })
    .dispatch({ type: 'FETCH_MOVIES_REQUEST' })
    .run();
});
