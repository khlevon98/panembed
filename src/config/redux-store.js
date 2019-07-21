import { applyMiddleware, compose, createStore } from 'redux';

import thunk from 'redux-thunk';

import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import createRootReducer from '../store/reducers';

import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';

import firebaseConfig from './firebase';

export const history = createBrowserHistory();

function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = [];
  const enhancers = [];

  middleware.push(thunk.withExtraArgument({ getFirebase, getFirestore }));
  middleware.push(routerMiddleware(history));

  enhancers.push(applyMiddleware(...middleware));
  enhancers.push(reduxFirestore(firebaseConfig));
  enhancers.push(reactReduxFirebase(firebaseConfig, { useFirestoreForProfile: true, userProfile: 'users' }));

  const store = createStore(
    createRootReducer(history),

    preloadedState,

    composeEnhancer(...enhancers)
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../store/reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}

export default configureStore;
