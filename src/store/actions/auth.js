import createAction from './create-action';
import ApiService from '../../services/api-service';
import ErrorService from '../../services/error-service';

/**
 * ACTION TYPES
 */
export const UN_AUTH_USER_REQUEST = 'UN_AUTH_USER_REQUEST';
export const UN_AUTH_USER_SUCCESS = 'UN_AUTH_USER_SUCCESS';
export const UN_AUTH_USER_FAILURE = 'UN_AUTH_USER_FAILURE';

export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

/**
 * THUNKS
 */

export const authenticateUser = data => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(AUTH_USER_REQUEST));

  Api.authenticateUser(data)
    .then(() => {
      dispatch(createAction(AUTH_USER_SUCCESS));
    })
    .catch(payload => {
      dispatch(createAction(AUTH_USER_FAILURE, ErrorService.parse(payload)));
    });
};

export const unAuthenticateUser = () => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(UN_AUTH_USER_REQUEST));

  Api.unAuthenticateUser()
    .then(() => {
      dispatch(createAction(UN_AUTH_USER_SUCCESS));
    })
    .catch(payload => {
      dispatch(createAction(UN_AUTH_USER_FAILURE, ErrorService.parse(payload)));
    });
};

export const createUser = data => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(CREATE_USER_REQUEST));

  Api.createUser(data)
    .then(payload => {
      dispatch(createAction(CREATE_USER_SUCCESS, payload.data));
    })
    .catch(payload => {
      dispatch(createAction(CREATE_USER_FAILURE, ErrorService.parse(payload)));
    });
};
