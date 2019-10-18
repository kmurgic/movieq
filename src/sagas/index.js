import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import fetchTopMovies from '../endpoints/fetchTopMovies';
import searchMovies from '../endpoints/searchMovies';

function* fetchMovies(action) {
  try {
    const movies = yield call(fetchTopMovies);
    yield put({ type: 'FETCH_MOVIES_SUCCESS', payload: movies });
  } catch (error) {
    yield put({ type: 'FETCH_MOVIES_ERROR', payload: error.message });
  }
}

function* watchFetchMovies() {
  yield takeLatest('FETCH_MOVIES_REQUEST', fetchMovies);
}

function* queryMovies(action) {
  try {
    const movies = yield call(searchMovies, action.payload);
    yield put({ type: 'QUERY_MOVIES_SUCCESS', payload: movies });
  } catch (error) {
    yield put({ type: 'QUERY_MOVIES_ERROR', payload: error.message });
  }
}

function* watchQueryMovies() {
  yield takeLatest('QUERY_MOVIES_REQUEST', queryMovies);
}

export default function* sagas() {
  yield all([
    watchFetchMovies(),
    watchQueryMovies(),
  ]);
}
