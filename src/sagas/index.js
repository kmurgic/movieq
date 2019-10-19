import {
  call, put, all, takeEvery, takeLatest,
} from 'redux-saga/effects';
import fetchTopMovies from '../endpoints/fetchTopMovies';
import searchMovies from '../endpoints/searchMovies';
import { queryMoviesSuccess, queryMoviesError, fetchMoviesError, fetchMoviesSuccess, notificationRemove } from '../actions';
import { QUERY_MOVIES_REQUEST, FETCH_MOVIES_REQUEST, NOTIFICATION_ADD } from '../actions/types';

function* fetchMovies(action) {
  try {
    const movies = yield call(fetchTopMovies);
    yield put(fetchMoviesSuccess(movies));
  } catch (error) {
    yield put(fetchMoviesError(error.message));
  }
};

function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES_REQUEST, fetchMovies);
};

function* queryMovies(action) {
  try {
    const movies = yield call(searchMovies, action.payload);
    yield put(queryMoviesSuccess(movies));
  } catch (error) {
    yield put(queryMoviesError(error.message));
  }
};

function* watchQueryMovies() {
  yield takeLatest(QUERY_MOVIES_REQUEST, queryMovies);
};

function* removeNotificationAfterDelay(action) {
  const { notificationId } = action.payload;
  const delay = time => new Promise(resolve => setTimeout(resolve, time));
  yield call(delay, 2000);
  yield put(notificationRemove(notificationId));
};

export function* watchAddNotification() {
  yield takeEvery(NOTIFICATION_ADD, removeNotificationAfterDelay);
};

export default function* sagas() {
  yield all([
    watchFetchMovies(),
    watchQueryMovies(),
    watchAddNotification(),
  ]);
};
