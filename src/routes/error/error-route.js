import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from '../../components/not-found';

class ErrorRoute extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <NotFound />
      </>
    );
  }
}

export default connect()(ErrorRoute);
