import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import Home from './home';
import NotFound from './error';

import { RouteWithMainLayout } from '../layouts/main';

const AppRoutes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithMainLayout path="/" component={Home} exact />

        <RouteWithMainLayout component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
};

AppRoutes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default AppRoutes;
