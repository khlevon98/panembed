import React from 'react';

import { withAuth } from '../hoc-helpers';
import { NavLink } from 'react-router-dom';

const DefaultNavigation = () => {
  return (
    <>
      <NavLink to="/auth/signin">Sign In</NavLink>
      <NavLink to="/auth/signup">Sign Up</NavLink>
    </>
  );
};

export default withAuth(false)(DefaultNavigation);
