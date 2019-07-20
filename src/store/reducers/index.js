import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './auth';
import userReducer from './user';
import projectReducer from './project';

const rootReducer = history =>
  combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,

    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    router: connectRouter(history),
  });

export default rootReducer;
