import {
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  SET_FECTHORGHEIRARCHY_ERROR,
  ADD_ORG_CHART_CHILD_SUCCESS,
  RESET_ORGHIRARCHY_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  isFetchOrgHierarchyPending: false,
  isFetchOrgHierarchySuccess: false,
  fetchOrgHierarchyError: null,
  orgHierarchy: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHORGHEIRARCHY_PENDING:
      return Object.assign({}, state, {
        isFetchOrgHierarchyPending: action.isFetchOrgHierarchyPending
      });

    case SET_FETCHORGHEIRARCHY_SUCCESS:
      return Object.assign({}, state, {
        isFetchOrgHierarchySuccess: action.isFetchOrgHierarchySuccess,
        orgHierarchy: action.orgHierarchy
      });

    case RESET_ORGHIRARCHY_SUCCESS:
      return Object.assign({}, state, {
        isFetchOrgHierarchySuccess: true,
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
    // return Object.assign({}, state, {
    //   isFetchOrgHierarchySuccess: action.isFetchOrgHierarchySuccess,
    //   orgHierarchy: action.orgHierarchy
    // });

    case SET_FECTHORGHEIRARCHY_ERROR:
      return Object.assign({}, state, {
        fetchOrgHierarchyError: action.fetchOrgHierarchyError
      });

    default:
      return state;
  }
};
