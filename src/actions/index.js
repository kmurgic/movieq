import { FETCH_MOVIES_REQUEST } from './types';
import { QUERY_MOVIES_REQUEST } from './types';


export const topMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

export const searchMoviesRequest = (searchTerm) => ({
  type: QUERY_MOVIES_REQUEST,
  payload: searchTerm,
});
