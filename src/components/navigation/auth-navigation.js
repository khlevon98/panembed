import React from 'react';

import { withAuth } from '../hoc-helpers';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { unAuthenticateUser } from '../../store/actions/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AuthNavigation = ({ signOut, history }) => {
  return (
    <>
      <NavLink to="/project/create">Create project</NavLink>
      <a
        href="/"
        onClick={e => {
          e.preventDefault();
          signOut();
          history.push('/');
        }}
        className="cursor-pointer"
      >
        Sign Out
      </a>
    </>
  );
};

AuthNavigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(unAuthenticateUser()),
  };
}

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRouter,
  withAuth()
);

export default enhance(AuthNavigation);
