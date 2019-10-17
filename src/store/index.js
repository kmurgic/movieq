import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import sagas from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
