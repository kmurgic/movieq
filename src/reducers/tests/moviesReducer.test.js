import moviesReducer from '../moviesReducer';
import { FETCH_MOVIES_REQUEST } from '../../actions/types';

const initialState = {
  error: false,
  loading: false,
  list: [],
}

it('should update loading to false on fetch request', () => {
  const action = { type: FETCH_MOVIES_REQUEST };
  expect(moviesReducer(initialState, action).loading).toEqual(true);
});

it('should update loading to true and update error on fetch failure', () => {
  const action = { type: 'FETCH_MOVIES_ERROR', payload: 'error message' };
  const loadingState = { ...initialState, loading: true };
  expect(moviesReducer(loadingState, action).loading).toEqual(false);
  expect(moviesReducer(loadingState, action).error).toEqual('error message');
});

it('should update loading to false and update movie list on fetch success', () => {
  const movieList = ['movie1', 'movie2', 'movie3'];
  const action = { type: 'FETCH_MOVIES_SUCCESS', payload: movieList };
  const loadingState = { ...initialState, loading: true };
  expect(moviesReducer(loadingState, action)).toEqual({
    error: false,
    loading: false,
    list: movieList,
  });
});

it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'FETCH_MOVIE_REQUEST' };
  expect(moviesReducer(undefined, action)).toEqual(initialState);
});
