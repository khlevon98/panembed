import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../spinner';

const withAuth = ({ render = true, redirectTo = null, showLoader = false } = {}) => View => {
  function mapStateToProps(state) {
    return {
      auth: {
        ...state.firebase.auth,
        isLoaded: state.firebase.auth.isLoaded && state.auth.isLoaded,
        error: state.auth.error,
        user: state.firebase.profile,
      },
    };
  }

  const enhance = compose(connect(mapStateToProps));

  return enhance(
    class extends Component {
      static propTypes = {
        auth: PropTypes.shape({
          uid: PropTypes.string,
          isLoaded: PropTypes.bool,
          error: PropTypes.shape({ fields: PropTypes.arrayOf(PropTypes.object), message: PropTypes.string }),
          user: PropTypes.shape({}),
        }).isRequired,
      };

      render() {
        const {
          auth: { isLoaded, uid },
        } = this.props;

        const isAuthorized = !!uid;

        if (!isLoaded) {
          return showLoader ? <Spinner /> : null;
        }

        let result = redirectTo ? <Redirect to={redirectTo} /> : null;

        if ((isAuthorized && render) || (!render && !isAuthorized)) {
          result = <View {...this.props} />;
        }

        return result;
      }
    }
  );
};

export default withAuth;
