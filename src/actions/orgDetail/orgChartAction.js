import {
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  SET_FECTHORGHEIRARCHY_ERROR,
  RESET_ORGHIRARCHY_SUCCESS,
  RESET_ORGHIRARCHY_ERROR
} from "../../constants/dispatch";
import { callFetchOrgHierarchyApi } from "../../api/orgDetail/orgDetailApi";

export const fetchOrgHierarchy = (orgId, callback) => {
  return dispatch => {
    dispatch(setFetchOrgHierarchyPending(true));
    dispatch(setFetchOrgHierarchySuccess(false, {}));
    dispatch(setFetchOrgHierarchyError(null));

    callFetchOrgHierarchyApi(orgId, (error, orgHierarchy) => {
      dispatch(setFetchOrgHierarchyPending(false));
      if (!error) {
        dispatch(setFetchOrgHierarchySuccess(true, orgHierarchy));
      } else {
        dispatch(setFetchOrgHierarchyError(error));
      }
    });
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

function setFetchOrgHierarchyPending(isFetchOrgHierarchyPending) {
  return {
    type: SET_FETCHORGHEIRARCHY_PENDING,
    isFetchOrgHierarchyPending
  };
}

function setFetchOrgHierarchySuccess(isFetchOrgHierarchySuccess, orgHierarchy) {
  return {
    type: SET_FETCHORGHEIRARCHY_SUCCESS,
    isFetchOrgHierarchySuccess,
    orgHierarchy
  };
}

function setFetchOrgHierarchyError(fetchOrgHierarchyError) {
  return {
    type: SET_FECTHORGHEIRARCHY_ERROR,
    fetchOrgHierarchyError
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
