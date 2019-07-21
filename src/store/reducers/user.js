import * as actionTypes from '../actions/user';

const initialState = {
  current: {
    isLoaded: true,
    error: null,
    data: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    /*  GET USER PART  */
    case actionTypes.FETCH_USER_REQUEST: {
      return {
        ...state,
        current: {
          ...state.current,
          isLoaded: false,
          error: null,
        },
      };
    }
    case actionTypes.FETCH_USER_FAILURE: {
      return {
        ...state,
        current: {
          ...state.current,
          isLoaded: true,
          error: action.payload,
        },
      };
    }
    case actionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        current: {
          ...state.current,
          data: action.payload,
          isLoaded: true,
          error: null,
        },
      };
    }
    default:
      return state;
  }
};
