import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Field } from '../../components/validator';

import ErrorBoundary from '../../components/error-boundary';
import ValidatorService from '../../services/validator-service';

class SignInRoute extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <section className="section">
        <ErrorBoundary>
          <div className="row">
            <Form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <Field
                  value={this.state.email}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule, ValidatorService.isEmail().rule]}
                  errorMessages={[ValidatorService.isRequired().message, ValidatorService.isEmail().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    return (
                      <div className="input-field col s12">
                        <input
                          {...props}
                          type="email"
                          name="email"
                          id="field-email"
                          className={!isValid ? ' invalid' : ''}
                        />
                        <label htmlFor="field-email">Email</label>
                        {!isValid ? <span className="helper-text">{getErrorMessage()}</span> : null}
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
                    return (
                      <div className="input-field col s12">
                        <input
                          {...props}
                          type="password"
                          name="password"
                          id="field-password"
                          className={!isValid ? ' invalid' : ''}
                        />
                        <label htmlFor="field-password">Password</label>
                        {!isValid ? <span className="helper-text">{getErrorMessage()}</span> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="row">
                <button type="submit" className="btn btn-large w-100">
                  Sign Up
                </button>
              </div>
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
    console.log(this.state, 'submit');
    e.preventDefault();
  };
}

export default connect()(SignInRoute);
