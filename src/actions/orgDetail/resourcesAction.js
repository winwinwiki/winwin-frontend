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

export const saveOrgResource = params => {
  return dispatch => {
    dispatch(saveResourcesReq());
    if (!params.id) {
      api(
        `/organization/${params.organizationId}/resource`,
        "POST",
        JSON.stringify(params),
        true
      ).then(
        response => {
          dispatch(saveResourcesSuccess(response));
        },
        error => {
          dispatch(saveResourcesError(error));
        }
      );
    } else {
      api(
        `/organization/${params.organizationId}/resource`,
        "PUT",
        JSON.stringify(params),
        true
      ).then(
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

export const fetchOrgResources = params => {
  return dispatch => {
    dispatch(fetchResourcesReq());
    api(`/organization/${params}/resources`, "GET", {}, true).then(
      response => {
        dispatch(fetchResourcesSuccess(response));
      },
      error => {
        dispatch(fetchResourcesError(error));
      }
    );
  };
};

export const deleteOrgResource = ({ orgId, resourceId }) => {
  return dispatch => {
    dispatch(deleteResourceReq());
    const deleteObj = {
      id: resourceId
    };
    api(
      `/organization/${orgId}/resource`,
      "DELETE",
      JSON.stringify(deleteObj),
      true
    ).then(
      response => {
        dispatch(deleteResourceSuccess(response));
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
