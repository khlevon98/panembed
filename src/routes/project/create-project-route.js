import React, { useEffect, useState } from 'react';

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

const CreateProjectRoute = ({ auth: { uid, user }, project: { isLoaded, error }, ...props }) => {
  const [{ isDidAction, showSuccessMessage }, setHelperState] = useState({
    isDidAction: false,
    showSuccessMessage: false,
  });

  const [state, setState] = useState({
    title: '',
    description: '',
    imageFile: undefined,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;

    setState({
      ...state,
      [name]: value,
      [`${name}File`]: files ? files[0] : undefined,
    });
  };

  const handleSubmit = e => {
    const { title, description, imageFile: image } = state;

    props.createProject({
      title,
      description,
      image,
      ownerId: uid,
      ownerName: `${user.firstName} ${user.lastName}`,
    });

    setHelperState({
      isDidAction: true,
      showSuccessMessage: false,
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (isDidAction) {
      if (isLoaded && !error) {
        // delete success case
        // console.log('success');

        setHelperState({
          isDidAction: false,
          showSuccessMessage: true,
        });

        setState({
          title: '',
          description: '',
          imageFile: '',
        });
      } /* else if (error) {
        // delete error case
        // console.log('error', error);
      } else {
        // delete in progress case
        // console.log('in progress');
      } */
    }
  }, [isDidAction, isLoaded, error]);

  return (
    <section className="section container">
      <div className="row">
        <h2 className="center">Create project</h2>
      </div>

      <div className="row">
        <ErrorBoundary>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <Field
                label="Project title"
                type="text"
                name="title"
                id="field-title"
                value={state.title}
                onChange={handleChange}
                validators={[ValidatorService.isRequired().rule]}
                errorMessages={[ValidatorService.isRequired().message]}
              />
            </div>

            <div className="row">
              <Field
                value={state.description}
                onChange={handleChange}
                validators={[ValidatorService.isRequired().rule]}
                errorMessages={[ValidatorService.isRequired().message]}
              >
                {({ props: inputProps, isValid, getErrorMessage }) => {
                  const className = `materialize-textarea ${!isValid ? 'invalid' : ''}`;
                  return (
                    <div className="input-field">
                      <textarea {...inputProps} name="description" id="field-description" className={className} />
                      <label htmlFor="field-description">Project description</label>
                      {!isValid ? <span className="helper-text" data-error={getErrorMessage()} /> : null}
                    </div>
                  );
                }}
              </Field>
            </div>

            <div className="row">
              <FileField
                label="File"
                name="image"
                id="field-image"
                value={state.imageFile}
                onChange={handleChange}
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
              />
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

            {showSuccessMessage ? (
              <div className="row">
                <div className="col s12">
                  <div className="card teal">
                    <div className="card-content white-text">
                      <p>Your project successfully created.</p>
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
};

CreateProjectRoute.propTypes = {
  project: PropTypes.shape({
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,
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
  withAuth({ redirectTo: '/auth/signin', showLoader: true })
);

export default enhance(CreateProjectRoute);
