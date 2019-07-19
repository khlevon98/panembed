import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    console.log(this.props)
    return (
      <>
        <h1>Hello World!</h1>
      </>
    );
  }
}

export default connect()(Home);
