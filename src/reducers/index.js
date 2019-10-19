import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import searchReducer from './searchReducer';
import queuesReducer from './queuesReducer';
import notificationsReducer from './notificationsReducer';

const rootReducer = combineReducers({
  discover: discoverReducer,
  notifications: notificationsReducer,
  queues: queuesReducer,
  search: searchReducer,
});

export default rootReducer;