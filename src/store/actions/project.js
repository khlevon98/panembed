import createAction from './create-action';
import ApiService from '../../services/api-service';
import ErrorService from '../../services/error-service';

/**
 * ACTION TYPES
 */

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

/**
 * THUNKS
 */

export const fetchProjects = query => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(FETCH_PROJECTS_REQUEST));

  Api.getProjects(query)
    .then(payload => {
      dispatch(createAction(FETCH_PROJECTS_SUCCESS, payload));
    })
    .catch(payload => {
      dispatch(createAction(FETCH_PROJECTS_FAILURE, ErrorService.parse(payload)));
    });
};

export const fetchProject = id => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(FETCH_PROJECT_REQUEST));

  Api.getProject(id)
    .then(payload => {
      dispatch(createAction(FETCH_PROJECT_SUCCESS, payload));
    })
    .catch(payload => {
      dispatch(createAction(FETCH_PROJECT_FAILURE, ErrorService.parse(payload)));
    });
};

export const createProject = data => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(CREATE_PROJECT_REQUEST));

  Api.createProject(data)
    .then(payload => {
      dispatch(createAction(CREATE_PROJECT_SUCCESS, payload.data));
    })
    .catch(payload => {
      dispatch(createAction(CREATE_PROJECT_FAILURE, ErrorService.parse(payload)));
    });
};

export const deleteProject = id => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(DELETE_PROJECT_REQUEST));

  Api.deleteProject(id)
    .then(payload => {
      dispatch(createAction(DELETE_PROJECT_SUCCESS, payload));
    })
    .catch(payload => {
      dispatch(createAction(DELETE_PROJECT_FAILURE, ErrorService.parse(payload)));
    });
};
