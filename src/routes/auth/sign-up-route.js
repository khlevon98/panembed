import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { createUser } from '../../store/actions/auth';

import ErrorBoundary from '../../components/error-boundary';
import { Field, Form } from '../../components/validator';
import ValidatorService from '../../services/validator-service';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class SignUpRoute extends React.Component {
  constructor(props) {
    super(props);

    this.redirectIf(props.auth.uid);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
    };
  }

  redirectIf = isAuthorized => {
    if (isAuthorized) this.props.history.push('/');
  };

  componentWillReceiveProps(nextProps) {
    this.redirectIf(nextProps.auth.uid);
  }

  render() {
    const { auth } = this.props;

    return (
      <section className="section">
        <ErrorBoundary>
          <div className="row">
            <Form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <Field
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;
                    return (
                      <div className="input-field col s12">
                        <input {...props} type="text" name="firstName" id="field-firstName" className={className} />
                        <label htmlFor="field-firstName">First name</label>
                        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>

              <div className="row">
                <Field
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;
                    return (
                      <div className="input-field col s12">
                        <input {...props} type="text" name="lastName" id="field-lastName" className={className} />
                        <label htmlFor="field-lastName">Last name</label>
                        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
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
                <Field
                  value={this.state.rePassword}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isPasswordMatch(this.state.password).rule]}
                  errorMessages={[ValidatorService.isPasswordMatch(this.state.password).message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;

                    return (
                      <div className="input-field col s12">
                        <input
                          {...props}
                          type="password"
                          name="rePassword"
                          id="field-rePassword"
                          className={className}
                        />
                        <label htmlFor="field-rePassword">Password</label>
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
          </div>
        </ErrorBoundary>
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
    // user: PropTypes.object,
  }).isRequired,
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

function mapStateToProps(state) {
  return {
    auth: {
      ...state.firebase.auth,
      isLoaded: state.firebase.auth.isLoaded && state.auth.isLoaded,
      error: state.auth.error,
      // user: state.firebase.profile,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: data => dispatch(createUser(data)),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
);

export default enhance(SignUpRoute);
