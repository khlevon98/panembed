import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withAuth } from '../../components/hoc-helpers';
import { createProject } from '../../store/actions/project';

import { Field, FileField, Form } from '../../components/validator';

import ErrorBoundary from '../../components/error-boundary';
import ValidatorService from '../../services/validator-service';
import { MBTobytes } from '../../utils';

class CreateProjectRoute extends React.Component {
  state = {
    title: '',
    image: '',
    imageFile: '',
  };

  render() {
    const {
      project: { isLoaded, error },
    } = this.props;
    return (
      <section className="section container">
        <div className="row">
          <h2 className="center">Create project</h2>
        </div>
        <div className="row">
          <ErrorBoundary>
            <Form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <Field
                  value={this.state.title}
                  onChange={this.handleChange}
                  validators={[ValidatorService.isRequired().rule]}
                  errorMessages={[ValidatorService.isRequired().message]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `${!isValid ? 'invalid' : ''}`;
                    return (
                      <div className="input-field col s12">
                        <input {...props} type="text" name="title" id="field-title" className={className} />
                        <label htmlFor="field-title">Project title</label>
                        {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                      </div>
                    );
                  }}
                </Field>
              </div>

              <div className="row">
                <FileField
                  value={this.state.imageFile}
                  onChange={this.handleChange}
                  validators={[
                    ValidatorService.isRequired().rule,
                    ValidatorService.isFile().rule,
                    ValidatorService.allowedExtensions('image/png,image/jpeg').rule,
                    ValidatorService.maxFileSize(MBTobytes(2)).rule,
                  ]}
                  errorMessages={[
                    ValidatorService.isRequired().message,
                    ValidatorService.isFile().message,
                    ValidatorService.allowedExtensions('image/png,image/jpeg').message,
                    ValidatorService.maxFileSize(MBTobytes(2)).message,
                  ]}
                >
                  {({ props, isValid, getErrorMessage }) => {
                    const className = `file-path ${!isValid ? 'invalid' : ''}`;
                    return (
                      <div className="file-field input-field col s12">
                        <div className="btn">
                          <span>File</span>
                          <input type="file" {...props} name="image" id="field-image" />
                        </div>
                        <div className="file-path-wrapper">
                          <input className={className} type="text" />
                          {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                        </div>
                      </div>
                    );
                  }}
                </FileField>
              </div>

              <div className="row">
                <button type="submit" className="btn btn-large w-100" disabled={!isLoaded}>
                  Create
                </button>
              </div>

              {error && error.message ? (
                <div className="row">
                  <div className="col s12">
                    <div className="card red">
                      <div className="card-content white-text">
                        <p>{error.message}</p>
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
    const { name, value, files } = e.target;

    this.setState({
      [name]: value,
      [`${name}File`]: files ? files[0] : undefined,
    });
  };

  handleSubmit = e => {
    const { title, imageFile: image } = this.state;

    const {
      auth: { uid, user },
    } = this.props;

    this.props.createProject({
      title,
      image,
      ownerId: uid,
      ownerName: `${user.firstName} ${user.lastName}`,
    });
    e.preventDefault();
  };
}

CreateProjectRoute.propTypes = {
  auth: PropTypes.shape({
    uid: PropTypes.string,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  createProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    project: state.project.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: data => dispatch(createProject(data)),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withAuth({ redirectTo: '/auth/signin' })
);

export default enhance(CreateProjectRoute);
