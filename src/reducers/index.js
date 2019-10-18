import { combineReducers } from 'redux';
import discoverReducer from './discoverReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  discover: discoverReducer,
  search: searchReducer,
});

export default rootReducer;