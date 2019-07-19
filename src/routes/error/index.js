import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <h1>this is error 404 page</h1>
      </>
    );
  }
}

export default connect()(NotFound);
