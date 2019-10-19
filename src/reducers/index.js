import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import searchReducer from './searchReducer';
import queuesReducer from './queuesReducer';

const rootReducer = combineReducers({
  discover: discoverReducer,
  queues: queuesReducer,
  search: searchReducer,
});

export default rootReducer;