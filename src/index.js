import React from 'react';

import './assets/styles/style.scss';

import 'materialize-css';

import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import ErrorBoundary from './components/error-boundary';

import Root from './routes';

import createStore, { history } from './config/redux-store';

import * as serviceWorker from './serviceWorker';

const store = createStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ErrorBoundary>
        <Root history={history} store={store} />
      </ErrorBoundary>
    </AppContainer>,
    document.getElementById('app-root')
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./routes', () => render());
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
