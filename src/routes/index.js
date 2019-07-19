import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';

import AppRoutes from './routes';

const Root = props => (
  <ReduxProvider store={props.store}>
    <AppRoutes history={props.history} />
  </ReduxProvider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Root;
