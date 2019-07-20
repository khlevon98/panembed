import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { compose } from 'redux';

import { withRouter } from 'react-router-dom';

import { authenticateUser } from '../../store/actions/auth';

import { Form, Field } from '../../components/validator';
import ErrorBoundary from '../../components/error-boundary';
import ValidatorService from '../../services/validator-service';
import { withAuth } from '../../components/hoc-helpers';

class SignInRoute extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const { auth } = this.props;

    return (
      <section className="section container">
        <div className="row">
          <h2 className="center">Sign In</h2>
        </div>
        <div className="row">
          <ErrorBoundary>
            <Form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <Field
                  value={this.state.email}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule, ValidatorService.isEmail().rule]}
                  errorMessages={[ValidatorService.isRequired().message, ValidatorService.isEmail().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;
                    return (
                      <div className="input-field col s12">
                        <input {...props} type="email" name="email" id="field-email" className={className} />
                        <label htmlFor="field-email">Email</label>
                        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="row">
                <Field
                  value={this.state.password}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;

                    return (
                      <div className="input-field col s12">
                        <input {...props} type="password" name="password" id="field-password" className={className} />
                        <label htmlFor="field-password">Password</label>
                        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="row">
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
    this.props.signIn(this.state);
    e.preventDefault();
  };
}

SignInRoute.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string,
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({ fields: PropTypes.arrayOf(PropTypes.object), message: PropTypes.string }),
  }).isRequired,
  signIn: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    signIn: data => dispatch(authenticateUser(data)),
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

export default enhance(SignInRoute);
