import {
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  SET_FECTHORGHEIRARCHY_ERROR,
  RESET_ORGHIRARCHY_SUCCESS,
  RESET_ORGHIRARCHY_ERROR,
  SET_ORG_CONTEXT_SUCCESS,
  SET_ORG_CONTEXT_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchOrgHierarchy = orgId => {
  return dispatch => {
    dispatch(setFetchOrgHierarchyPending());
    api(`/organization/${orgId}/suborganization`, "GET", {}, true).then(
      response => {
        dispatch(setFetchOrgHierarchySuccess(response));
      },
      error => {
        dispatch(setFetchOrgHierarchyError(error));
      }
    );
  };
};

export const resetOrgHierarchyData = () => {
  return async dispatch => {
    try {
      dispatch(resetOrgHierarchyDataSuccess());
    } catch (err) {
      resetOrgHierarchyDataError();
    }
  };
};

export const setOrgContext = id => {
  return async dispatch => {
    try {
      dispatch(setOrgContextSuccess(id));
    } catch (err) {
      setOrgContextError();
    }
  };
};

function setFetchOrgHierarchyPending() {
  return {
    type: SET_FETCHORGHEIRARCHY_PENDING
  };
}

function setFetchOrgHierarchySuccess(response) {
  return {
    type: SET_FETCHORGHEIRARCHY_SUCCESS,
    response
  };
}

function setFetchOrgHierarchyError(error) {
  return {
    type: SET_FECTHORGHEIRARCHY_ERROR,
    error
  };
}

function resetOrgHierarchyDataSuccess(response) {
  return {
    type: RESET_ORGHIRARCHY_SUCCESS,
    response
  };
}

function resetOrgHierarchyDataError(error) {
  return {
    type: RESET_ORGHIRARCHY_ERROR,
    error
  };
}

function setOrgContextSuccess(response) {
  return {
    type: SET_ORG_CONTEXT_SUCCESS,
    response
  };
}

function setOrgContextError(error) {
  return {
    type: SET_ORG_CONTEXT_ERROR,
    error
  };
}
