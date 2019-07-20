import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { createUser, authenticateUser, unAuthenticateUser } from '../../store/actions/user';

import ErrorBoundary from '../../components/error-boundary';

class SignUpRoute extends React.Component {
  constructor(props) {
    super(props);
    window.prs = props;
  }

  render() {
    return (
      <section className="section">
        <ErrorBoundary>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input id="first_name" type="text" className="validate invalid" />
                  <label htmlFor="first_name">First Name</label>
                  <span className="helper-text" data-error="wrong" data-success="right">
                    Helper text
                  </span>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="phone" type="number" className="validate" />
                  <label htmlFor="phone">Phone number</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <button type="submit" className="btn btn-large w-100">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </ErrorBoundary>
      </section>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createUser(data) {
      dispatch(createUser(data));
    },
    authenticateUser(data) {
      dispatch(authenticateUser(data));
    },
    unAuthenticateUser() {
      dispatch(unAuthenticateUser());
    },
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUpRoute);
