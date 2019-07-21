import * as actionTypes from '../actions/project';

const initialState = {
  current: {
    isLoaded: true,
    error: null,
    data: null,
  },
  list: {
    isLoaded: true,
    error: null,
    data: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    /*  GET PROJECTS PART  */
    case actionTypes.FETCH_PROJECTS_REQUEST: {
      return {
        ...state,
        list: {
          ...state.list,
          isLoaded: false,
          error: null,
        },
      };
    }
    case actionTypes.FETCH_PROJECTS_FAILURE: {
      return {
        ...state,
        list: {
          ...state.list,
          isLoaded: true,
          error: action.payload,
        },
      };
    }
    case actionTypes.FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        list: {
          ...state.list,
          data: action.payload,
          isLoaded: true,
          error: null,
        },
      };
    }

    /*  GET PROJECT PART  */
    case actionTypes.FETCH_PROJECT_REQUEST: {
      return {
        ...state,
        current: {
          ...state.current,
          isLoaded: false,
          error: null,
        },
      };
    }
    case actionTypes.FETCH_PROJECT_FAILURE: {
      return {
        ...state,
        current: {
          ...state.current,
          isLoaded: true,
          error: action.payload,
        },
      };
    }
    case actionTypes.FETCH_PROJECT_SUCCESS: {
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

    /* CREATE AND DELETE PROJECT PART */
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECT_REQUEST: {
      return {
        ...state,
        current: {
          ...state.current,
          data: null,
          isLoaded: false,
          error: null,
        },
      };
    }

    case actionTypes.CREATE_PROJECT_SUCCESS:
    case actionTypes.DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        current: {
          ...state.current,
          data: null,
          isLoaded: true,
          error: null,
        },
      };
    }

    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.DELETE_PROJECT_FAILURE: {
      return {
        ...state,
        current: {
          ...state.current,
          data: null,
          isLoaded: true,
          error: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
