import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { createUser } from '../../store/actions/auth';

import ErrorBoundary from '../../components/error-boundary';
import { Field, Form } from '../../components/validator';
import ValidatorService from '../../services/validator-service';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withAuth } from '../../components/hoc-helpers';

class SignUpRoute extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  };

  render() {
    const { auth } = this.props;

    return (
      <section className="section container">
        <div className="row">
          <h2 className="center">Sign Up</h2>
        </div>
        <div className="row">
          <ErrorBoundary>
            <Form onSubmit={this.handleSubmit}>
              <div className="row">
                <Field
                  label="First name"
                  type="text"
                  name="firstName"
                  id="field-firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                />
              </div>

              <div className="row">
                <Field
                  label="Last name"
                  type="text"
                  name="lastName"
                  id="field-lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                />
              </div>
              <div className="row">
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  id="field-email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule, ValidatorService.isEmail().rule]}
                  errorMessages={[ValidatorService.isRequired().message, ValidatorService.isEmail().message]}
                />
              </div>

              <div className="row">
                <Field
                  label="Password"
                  type="password"
                  name="password"
                  id="field-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                />
              </div>
              <div className="row">
                <Field
                  label="Reenter password"
                  type="password"
                  name="rePassword"
                  id="field-rePassword"
                  value={this.state.rePassword}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isPasswordMatch(this.state.password).rule]}
                  errorMessages={[ValidatorService.isPasswordMatch(this.state.password).message]}
                />
              </div>

              <div className="row center">
                <button type="submit" className="btn btn-large w-100" disabled={!auth.isLoaded}>
                  Sign Up
                </button>
              </div>

              {auth.error && auth.error.message ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card red">
                      <div className="card-content white-text">
                        <p>{auth.error.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Form>
          </ErrorBoundary>
        </div>
      </section>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    this.props.signUp(this.state);
    e.preventDefault();
  };
}

SignUpRoute.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string,
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({ fields: PropTypes.arrayOf(PropTypes.object), message: PropTypes.string }),
  }).isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signUp: data => dispatch(createUser(data)),
  };
}

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRouter,
  withAuth({
    render: false,
    redirectTo: '/',
  })
);

export default enhance(SignUpRoute);
