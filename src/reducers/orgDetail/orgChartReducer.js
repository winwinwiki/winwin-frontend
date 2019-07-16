import {
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  SET_FECTHORGHEIRARCHY_ERROR,
  ADD_ORG_CHART_CHILD_SUCCESS,
  RESET_ORGHIRARCHY_SUCCESS,
  DELETEORG_SUCCESS
} from "../../constants/dispatch";

import { removeFromTree, findItemNested } from "../../util/util";

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
      var obj = state.orgHierarchy.response;
      var bla = findItemNested([obj], action.parentId);
      bla.children.push(action.response.response);
      return {
        ...state,
        orgHierarchy: {
          ...state.orgHierarchy,
          response: {
            ...obj
          }
        }
      };

    case DELETEORG_SUCCESS:
      const filteredTree = removeFromTree(
        state.orgHierarchy.response,
        action.response
      );
      return {
        ...state,
        orgHierarchy: {
          ...state.orgHierarchy,
          response: {
            ...filteredTree
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
