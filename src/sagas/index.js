import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import fetchTopMovies from '../endpoints/fetchTopMovies';

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

export default function* sagas() {
  yield all([
    watchFetchMovies(),
  ]);
}
