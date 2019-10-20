import {
  DISCOVER_MOVIES_REQUEST, DISCOVER_MOVIES_SUCCESS, DISCOVER_MOVIES_ERROR,
  QUERY_MOVIES_SUCCESS, QUERY_MOVIES_ERROR, QUEUE_ADD, QUEUE_REMOVE, QUEUE_ITEM_ADD,
  QUEUE_ITEM_REORDER, QUEUE_ITEM_REMOVE, NOTIFICATION_ADD, NOTIFICATION_REMOVE,
  QUEUE_REORDER, QUEUE_CHANGE,
} from './types';
import { QUERY_MOVIES_REQUEST } from './types';


export const discoverMoviesRequest = (filters) => ({
  type: DISCOVER_MOVIES_REQUEST,
  payload: filters,
});

export const discoverMoviesSuccess = (movies) => ({
  type: DISCOVER_MOVIES_SUCCESS,
  payload: movies,
});

export const discoverMoviesError = (errorMessage) => ({
  type: DISCOVER_MOVIES_ERROR,
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

export const queueReorder = (startPos, endPos) => ({
  type: QUEUE_REORDER,
  payload: {
    startPos,
    endPos,
  },
});

export const queueChange = (queueId, changes) => ({
  type: QUEUE_CHANGE,
  payload: {
    queueId,
    changes,
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

export const notificationAdd = (heading, body, variant, notificationId) => ({
  type: NOTIFICATION_ADD,
  payload: {
    notificationId,
    heading,
    body,
    variant,
  }
});

export const notificationRemove = (notificationId) => ({
  type: NOTIFICATION_REMOVE,
  payload: {
    notificationId,
  }
});
