import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';

const withAuth = ({ render = true, redirectTo = null } = {}) => View => {
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
      constructor(props) {
        super(props);

        this.state = {
          isAuthorized: !!props.auth.uid,
        };
      }

      static propTypes = {
        auth: PropTypes.shape({
          uid: PropTypes.string,
          isLoaded: PropTypes.bool,
          error: PropTypes.shape({ fields: PropTypes.arrayOf(PropTypes.object), message: PropTypes.string }),
          user: PropTypes.shape({}),
        }).isRequired,
      };

      componentWillReceiveProps(nextProps) {
        this.setState({ isAuthorized: !!nextProps.auth.uid });
      }

      render() {
        const { isAuthorized } = this.state;
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
