import searchReducer from '../searchReducer';
import { searchMoviesRequest } from '../../actions';

const initialState = {
  error: false,
  loading: false,
  movies: [],
};

it('should update loading to false on fetch request', () => {
  const action = searchMoviesRequest('search text');
  expect(searchReducer(initialState, action).loading).toEqual(true);
});

it('should update loading to true and update error on fetch failure', () => {
  const action = { type: 'QUERY_MOVIES_ERROR', payload: 'error message' };
  const loadingState = { ...initialState, loading: true };
  expect(searchReducer(loadingState, action).loading).toEqual(false);
  expect(searchReducer(loadingState, action).error).toEqual('error message');
});

it('should update loading to false and update movie movies on fetch success', () => {
  const movieList = ['movie1', 'movie2', 'movie3'];
  const action = { type: 'QUERY_MOVIES_SUCCESS', payload: movieList };
  const loadingState = { ...initialState, loading: true };
  expect(searchReducer(loadingState, action)).toEqual({
    error: false,
    loading: false,
    movies: movieList,
  });
});

it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'QUERY_MOVIE_REQUEST' };
  expect(searchReducer(undefined, action)).toEqual(initialState);
});