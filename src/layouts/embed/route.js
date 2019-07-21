import React from 'react';
import { Route } from 'react-router-dom';

import EmbedLayout from './embed-layout';

const RouteWithMainLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <EmbedLayout>
            <Component {...matchProps} />
          </EmbedLayout>
        );
      }}
    />
  );
};

export default RouteWithMainLayout;
