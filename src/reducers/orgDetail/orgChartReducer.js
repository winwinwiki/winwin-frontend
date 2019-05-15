import {
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  SET_FECTHORGHEIRARCHY_ERROR,
  ADD_ORG_CHART_CHILD_SUCCESS,
  RESET_ORGHIRARCHY_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  orgHierarchy: {},
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHORGHEIRARCHY_PENDING:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case SET_FETCHORGHEIRARCHY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        orgHierarchy: action.response,
        error: false
      });

    case RESET_ORGHIRARCHY_SUCCESS:
      return Object.assign({}, state, {
        orgHierarchy: initialState
      });

    case ADD_ORG_CHART_CHILD_SUCCESS:
      return {
        ...state,
        orgHierarchy: {
          ...state.orgHierarchy,
          response: {
            ...state.orgHierarchy.response,
            children: [
              ...(state.orgHierarchy.response &&
                state.orgHierarchy.response.children),
              action.response.response
            ]
          }
        }
      };

    case SET_FECTHORGHEIRARCHY_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
};
