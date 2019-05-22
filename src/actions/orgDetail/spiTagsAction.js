import {
  FETCH_SPITAGS_REQUEST,
  FETCH_SPITAGS_SUCCESS,
  FETCH_SPITAGS_ERROR,
  UPDATE_SPIDATA_REQUEST,
  UPDATE_SPIDATA_SUCCESS,
  UPDATE_SPIDATA_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const fetchSpiTags = (organizationId, type) => {
  return dispatch => {
    dispatch(spiTagsRequest());
    let url =
      type === PROGRAM
        ? `/program/${organizationId}/spidata/selected`
        : `/organization/${organizationId}/spidata/selected`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(spiTagsSuccess(response));
      },
      error => {
        dispatch(spiTagsError(error));
      }
    );
  };
};

export const updateSPIData = (apiObj, orgId, filteredObj, type, programId) => {
  return dispatch => {
    dispatch(updateSPIDataReq());
    let url =
      type === PROGRAM
        ? `/program/${programId}/spidata`
        : `/organization/${orgId}/spidata`;
    api(url, "POST", JSON.stringify(apiObj), true).then(
      response => {
        dispatch(updateSPIDataSuccess(response, filteredObj));
      },
      error => {
        dispatch(updateSPIDataError(error));
      }
    );
  };
};

function spiTagsRequest() {
  return {
    type: FETCH_SPITAGS_REQUEST
  };
}

function spiTagsSuccess(response) {
  return {
    type: FETCH_SPITAGS_SUCCESS,
    response
  };
}

function spiTagsError(error) {
  return {
    type: FETCH_SPITAGS_ERROR,
    error
  };
}

function updateSPIDataReq() {
  return {
    type: UPDATE_SPIDATA_REQUEST
  };
}

function updateSPIDataSuccess(response, filteredObj) {
  return {
    type: UPDATE_SPIDATA_SUCCESS,
    filteredObj
  };
}

function updateSPIDataError(error) {
  return {
    type: UPDATE_SPIDATA_ERROR,
    error
  };
}
