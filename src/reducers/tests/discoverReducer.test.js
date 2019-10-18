import discoverReducer from '../discoverReducer';
import { FETCH_MOVIES_REQUEST } from '../../actions/types';

const initialState = {
  error: false,
  loading: false,
  movies: [],
}

it('should update loading to false on fetch request', () => {
  const action = { type: FETCH_MOVIES_REQUEST };
  expect(discoverReducer(initialState, action).loading).toEqual(true);
});

it('should update loading to true and update error on fetch failure', () => {
  const action = { type: 'FETCH_MOVIES_ERROR', payload: 'error message' };
  const loadingState = { ...initialState, loading: true };
  expect(discoverReducer(loadingState, action).loading).toEqual(false);
  expect(discoverReducer(loadingState, action).error).toEqual('error message');
});

it('should update loading to false and update movie movies on fetch success', () => {
  const movieList = ['movie1', 'movie2', 'movie3'];
  const action = { type: 'FETCH_MOVIES_SUCCESS', payload: movieList };
  const loadingState = { ...initialState, loading: true };
  expect(discoverReducer(loadingState, action)).toEqual({
    error: false,
    loading: false,
    movies: movieList,
  });
});

it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'FETCH_MOVIE_REQUEST' };
  expect(discoverReducer(undefined, action)).toEqual(initialState);
});