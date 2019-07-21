import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import Home from './home';
import { SignIn, SignUp } from './auth';
import { CreateProject, ViewMyProjects, ViewProject } from './project';
import Embed from './embed';
import Error from './error';

import { RouteWithMainLayout } from '../layouts/main';
import { RouteWithEmbedLayout } from '../layouts/embed';

const AppRoutes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithMainLayout path="/" component={Home} exact />

        <RouteWithMainLayout path="/auth/signin" component={SignIn} exact />

        <RouteWithMainLayout path="/auth/signup" component={SignUp} exact />

        <RouteWithMainLayout path="/projects/my" component={ViewMyProjects} exact />

        <RouteWithMainLayout path="/projects/create" component={CreateProject} exact />

        <RouteWithMainLayout path="/projects/:id" component={ViewProject} exact />

        <RouteWithEmbedLayout path="/embed/:id" component={Embed} exact />

        <RouteWithMainLayout component={Error} />
      </Switch>
    </ConnectedRouter>
  );
};

AppRoutes.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default AppRoutes;
