import createAction from './create-action';
import ApiService from '../../services/api-service';
import ErrorService from '../../services/error-service';

/**
 * ACTION TYPES
 */
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

/**
 * THUNKS
 */
export const fetchUser = id => (dispatch, getState, { getFirebase, getFirestore }) => {
  const Api = new ApiService(getFirestore(), getFirebase());

  dispatch(createAction(FETCH_USER_REQUEST));

  Api.getUser(id)
    .then(payload => {
      dispatch(createAction(FETCH_USER_SUCCESS, payload.data));
    })
    .catch(payload => {
      dispatch(createAction(FETCH_USER_FAILURE, ErrorService.parse(payload)));
    });
};
