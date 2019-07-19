import React from 'react';
import { Route } from 'react-router-dom';

import AppLayout from './main-layout';

const RouteWithMainLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <AppLayout>
            <Component {...matchProps} />
          </AppLayout>
        );
      }}
    />
  );
};

export default RouteWithMainLayout;
