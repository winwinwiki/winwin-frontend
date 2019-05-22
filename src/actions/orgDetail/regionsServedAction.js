import {
  FETCH_REGIONSERVED_REQUEST,
  FETCH_REGIONSERVED_SUCCESS,
  FETCH_REGIONSERVED_ERROR,
  SAVE_REGIONSERVED_REQUEST,
  SAVE_REGIONSERVED_SUCCESS,
  SAVE_REGIONSERVED_ERROR,
  REMOVE_REGIONSERVED_REQUEST,
  REMOVE_REGIONSERVED_SUCCESS,
  REMOVE_REGIONSERVED_ERROR,
  RESET_REGIONSERVED_SUCCESS,
  RESET_REGIONSERVED_ERROR,
  UPDATE_REGIONSERVED_SUCCESS,
  UPDATE_REGIONSERVED_ERROR,
  FETCH_REGIONSLIST_REQUEST,
  FETCH_REGIONSLIST_SUCCESS,
  FETCH_REGIONSLIST_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

//change method
export const saveOrgRegionsServed = (
  updatedRegions,
  orgId,
  type,
  programId
) => {
  return dispatch => {
    dispatch(saveRegionsServedReq());
    let url =
      type === PROGRAM
        ? `/program/${programId}/region`
        : `/organization/${orgId}/region`;
    api(url, "POST", JSON.stringify(updatedRegions), true).then(
      response => {
        dispatch(saveRegionsServedSuccess(response));
      },
      error => {
        dispatch(saveRegionsServedError(error));
      }
    );
  };
};

export const updateRegionsAction = params => {
  return async dispatch => {
    try {
      dispatch(updateRegionsServedSuccess(params));
    } catch (err) {
      updateRegionsServedError();
    }
  };
};

// Action to remove region from store
export const removeRegionAction = id => {
  return async dispatch => {
    try {
      dispatch(removeRegionsServedReq());
      dispatch(removeRegionsServedSuccess(id));
    } catch (err) {
      removeRegionsServedError();
    }
  };
};

export const resetRegionsAction = () => {
  return async dispatch => {
    try {
      dispatch(resetRegionsServedSuccess());
    } catch (err) {
      resetRegionsServedError();
    }
  };
};

export const fetchOrgRegionsServed = (organizationId, type) => {
  return dispatch => {
    dispatch(fetchRegionsServedReq());
    let url =
      type === PROGRAM
        ? `/program/${organizationId}/regions`
        : `/organization/${organizationId}/regions`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchRegionsServedSuccess(response));
      },
      error => {
        dispatch(fetchRegionsServedError(error));
      }
    );
  };
};

//Regions Master List API
export const fetchRegionsList = (organizationId, type) => {
  return dispatch => {
    dispatch(fetchRegionsListReq());
    let url =
      type === PROGRAM
        ? `/program/${organizationId}/regionmasters`
        : `/organization/${organizationId}/regionmasters`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchRegionsListSuccess(response));
      },
      error => {
        dispatch(fetchRegionsListError(error));
      }
    );
  };
};

function fetchRegionsServedReq() {
  return {
    type: FETCH_REGIONSERVED_REQUEST
  };
}

function fetchRegionsServedSuccess(response) {
  return {
    type: FETCH_REGIONSERVED_SUCCESS,
    response
  };
}

function fetchRegionsServedError(error) {
  return {
    type: FETCH_REGIONSERVED_ERROR,
    error
  };
}

function saveRegionsServedReq() {
  return {
    type: SAVE_REGIONSERVED_REQUEST
  };
}

function saveRegionsServedSuccess(response) {
  return {
    type: SAVE_REGIONSERVED_SUCCESS,
    response
  };
}

function saveRegionsServedError(error) {
  return {
    type: SAVE_REGIONSERVED_ERROR,
    error
  };
}

function removeRegionsServedReq() {
  return {
    type: REMOVE_REGIONSERVED_REQUEST
  };
}

function removeRegionsServedSuccess(response) {
  return {
    type: REMOVE_REGIONSERVED_SUCCESS,
    response
  };
}

function removeRegionsServedError(error) {
  return {
    type: REMOVE_REGIONSERVED_ERROR,
    error
  };
}

function resetRegionsServedSuccess(response) {
  return {
    type: RESET_REGIONSERVED_SUCCESS,
    response
  };
}

function resetRegionsServedError(error) {
  return {
    type: RESET_REGIONSERVED_ERROR,
    error
  };
}

function updateRegionsServedSuccess(response) {
  return {
    type: UPDATE_REGIONSERVED_SUCCESS,
    response
  };
}

function updateRegionsServedError(error) {
  return {
    type: UPDATE_REGIONSERVED_ERROR,
    error
  };
}

function fetchRegionsListReq() {
  return {
    type: FETCH_REGIONSLIST_REQUEST
  };
}

function fetchRegionsListSuccess(response) {
  return {
    type: FETCH_REGIONSLIST_SUCCESS,
    response
  };
}

function fetchRegionsListError(error) {
  return {
    type: FETCH_REGIONSLIST_ERROR,
    error
  };
}
