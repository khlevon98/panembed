import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import projectReducer from './project';

const rootReducer = history =>
  combineReducers({
    user: userReducer,
    project: projectReducer,
    router: connectRouter(history),
  });

export default rootReducer;
