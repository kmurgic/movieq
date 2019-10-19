import {
  FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_ERROR, QUERY_MOVIES_SUCCESS,
  QUERY_MOVIES_ERROR, QUEUE_ADD, QUEUE_REMOVE, QUEUE_ITEM_ADD, QUEUE_ITEM_REORDER,
  QUEUE_ITEM_REMOVE,
} from './types';
import { QUERY_MOVIES_REQUEST } from './types';


export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMoviesError = (errorMessage) => ({
  type: FETCH_MOVIES_ERROR,
  payload: errorMessage,
});

export const queryMoviesRequest = (searchTerm) => ({
  type: QUERY_MOVIES_REQUEST,
  payload: searchTerm,
});

export const queryMoviesSuccess = (movies) => ({
  type: QUERY_MOVIES_SUCCESS,
  payload: movies,
});

export const queryMoviesError = (errorMessage) => ({
  type: QUERY_MOVIES_ERROR,
  payload: errorMessage,
});

export const queueAdd = (name) => ({
  type: QUEUE_ADD,
  payload: {
    name,
  },
});

export const queueRemove = (queueId) => ({
  type: QUEUE_REMOVE,
  payload: {
    queueId,
  },
});

export const queueItemAdd = (queueId, movie) => ({
  type: QUEUE_ITEM_ADD,
  payload: {
    queueId,
    movie,
  },
});

export const queueItemReorder = (queueId, startPos, endPos) => ({
  type: QUEUE_ITEM_REORDER,
  payload: {
    queueId,
    startPos,
    endPos,
  },
});

export const queueItemRemove = (queueId, movieId) => ({
  type: QUEUE_ITEM_REMOVE,
  payload: {
    queueId,
    movieId,
  },
});
