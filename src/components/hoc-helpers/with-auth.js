import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

const withAuth = (render = true) => View => {
  function mapStateToProps(state) {
    return {
      auth: {
        uid: state.firebase.auth.uid,
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
        }).isRequired,
      };

      componentWillReceiveProps(nextProps) {
        this.setState({ isAuthorized: !!nextProps.auth.uid });
      }

      render() {
        if (!render) {
          return !this.state.isAuthorized ? <View {...this.props} /> : null;
        }
        return this.state.isAuthorized ? <View {...this.props} /> : null;
      }
    }
  );
};

export default withAuth;
