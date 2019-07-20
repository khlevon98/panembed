import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import Home from './home';
import { SignIn, SignUp } from './auth';
import { CreateProject, ViewProject } from './project';
import NotFound from './error';

import { RouteWithMainLayout } from '../layouts/main';

const AppRoutes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithMainLayout path="/" component={Home} exact />

        <RouteWithMainLayout path="/auth/signin" component={SignIn} exact />

        <RouteWithMainLayout path="/auth/signup" component={SignUp} exact />

        <RouteWithMainLayout path="/project/create" component={CreateProject} exact />

        <RouteWithMainLayout path="/project/:id" component={ViewProject} exact />

        <RouteWithMainLayout component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
};

AppRoutes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default AppRoutes;
