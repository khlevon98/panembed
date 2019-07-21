import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ErrorBoundary from '../../components/error-boundary';

import ProjectList from '../../components/project-list';
import { deleteProject, fetchProjects } from '../../store/actions/project';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Spinner from '../../components/spinner';
import PropTypes from 'prop-types';
import { withAuth } from '../../components/hoc-helpers';

const ViewMyProjects = props => {
  const [{ isDidAction, showSuccessMessage }, setHelperState] = useState({
    isDidAction: false,
    showSuccessMessage: false,
  });

  const handleDelete = id => {
    props.deleteProject(id);

    setHelperState({
      isDidAction: true,
      showSuccessMessage: false,
    });
  };

  const {
    getProjects,
    auth: { uid },
    projects: { data, isLoaded },
    project: { error: deleteError, isLoaded: deleteIsLoaded },
  } = props;

  // initialize HOOKS

  useEffect(() => {
    if (!isDidAction) {
      // update projects list first time and after delete
      getProjects([['ownerId', '==', uid]]);
    }
  }, [isDidAction, getProjects, uid]);

  useEffect(() => {
    if (isDidAction) {
      if (deleteIsLoaded && !deleteError) {
        // delete success case
        // console.log('success');

        setHelperState({
          isDidAction: false,
          showSuccessMessage: true,
        });
      } /* else if (error) {
        // delete error case
        // console.log('error', error);
      } else {
        // delete in progress case
        // console.log('in progress');
      } */
    }
  }, [isDidAction, deleteIsLoaded, deleteError]);

  if (!isLoaded || !deleteIsLoaded) {
    return <Spinner />;
  }

  return (
    <section className="section">
      <ErrorBoundary>
        <ProjectList data={data} userId={uid} handleDelete={handleDelete} />
      </ErrorBoundary>
    </section>
  );
};

ViewMyProjects.propTypes = {
  projects: PropTypes.shape({
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  project: PropTypes.shape({
    isLoaded: PropTypes.bool,
    error: PropTypes.shape({}),
  }).isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  getProjects: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: {
      uid: state.firebase.auth.uid,
    },
    projects: state.project.list,
    project: state.project.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProjects: query => dispatch(fetchProjects(query)),
    deleteProject: id => dispatch(deleteProject(id)),
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

export default enhance(ViewMyProjects);
