import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  SAVE_RESOURCES_REQUEST,
  SAVE_RESOURCES_SUCCESS,
  SAVE_RESOURCES_ERROR,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const saveOrgResource = (params, type) => {
  return dispatch => {
    dispatch(saveResourcesReq());
    let url =
      type === PROGRAM
        ? `/program/${params.programId}/resource`
        : `/organization/${params.organizationId}/resource`;
    if (!params.id) {
      api(url, "POST", JSON.stringify(params), true).then(
        response => {
          dispatch(saveResourcesSuccess(response));
        },
        error => {
          dispatch(saveResourcesError(error));
        }
      );
    } else {
      api(url, "PUT", JSON.stringify(params), true).then(
        response => {
          dispatch(saveResourcesSuccess(response));
        },
        error => {
          dispatch(saveResourcesError(error));
        }
      );
    }
  };
};

export const fetchOrgResources = (params, type) => {
  return dispatch => {
    dispatch(fetchResourcesReq());
    let url =
      type === PROGRAM
        ? `/program/${params}/resources`
        : `/organization/${params}/resources`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchResourcesSuccess(response));
      },
      error => {
        dispatch(fetchResourcesError(error));
      }
    );
  };
};

export const deleteOrgResource = (
  orgId,
  resourceId,
  type,
  filteredList,
  programId
) => {
  return dispatch => {
    dispatch(deleteResourceReq());
    let url =
      type === PROGRAM
        ? `/program/${programId}/resource`
        : `/organization/${orgId}/resource`;
    const deleteObj = {
      id: resourceId
    };
    if (type === PROGRAM) {
      deleteObj.programId = programId;
      deleteObj.organizationId = orgId;
    }
    api(url, "DELETE", JSON.stringify(deleteObj), true).then(
      response => {
        dispatch(deleteResourceSuccess(filteredList));
      },
      error => {
        dispatch(deleteResourceError(error));
      }
    );
  };
};

function fetchResourcesReq() {
  return {
    type: FETCH_RESOURCES_REQUEST
  };
}

function fetchResourcesSuccess(response) {
  return {
    type: FETCH_RESOURCES_SUCCESS,
    response
  };
}

function fetchResourcesError(error) {
  return {
    type: FETCH_RESOURCES_ERROR,
    error
  };
}

function saveResourcesReq() {
  return {
    type: SAVE_RESOURCES_REQUEST
  };
}

function saveResourcesSuccess(response) {
  return {
    type: SAVE_RESOURCES_SUCCESS,
    response
  };
}

function saveResourcesError(error) {
  return {
    type: SAVE_RESOURCES_ERROR,
    error
  };
}

function deleteResourceReq() {
  return {
    type: DELETE_RESOURCE_REQUEST
  };
}

function deleteResourceSuccess(response) {
  return {
    type: DELETE_RESOURCE_SUCCESS,
    response
  };
}

function deleteResourceError(error) {
  return {
    type: DELETE_RESOURCE_ERROR,
    error
  };
}
