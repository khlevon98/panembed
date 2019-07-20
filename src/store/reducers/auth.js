import * as actionTypes from '../actions/auth';

const initialState = {
  error: null,
  isLoaded: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_REQUEST:
    case actionTypes.UN_AUTH_USER_REQUEST:
    case actionTypes.CREATE_USER_REQUEST: {
      return {
        ...state,
        error: null,
        isLoaded: false,
      };
    }

    case actionTypes.AUTH_USER_SUCCESS:
    case actionTypes.UN_AUTH_USER_SUCCESS:
    case actionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoaded: true,
      };
    }

    case actionTypes.AUTH_USER_FAILURE:
    case actionTypes.UN_AUTH_USER_FAILURE:
    case actionTypes.CREATE_USER_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isLoaded: true,
      };
    }

    default:
      return state;
  }
};
