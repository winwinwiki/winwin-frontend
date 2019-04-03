import {
  FETCH_ORGDETAIL_REQUEST,
  FETCH_ORGDETAIL_SUCCESS,
  FETCH_ORGDETAIL_ERROR,
  FETCH_PROGDETAIL_REQUEST,
  FETCH_PROGDETAIL_SUCCESS,
  FECTH_PROGDETAIL_ERROR,
  SAVE_ORGDETAIL_BASIC_INFO_REQUEST,
  SAVE_ORGDETAIL_BASIC_INFO_SUCCESS,
  SAVE_ORGDETAIL_BASIC_INFO_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchOrganisationDetail = params => {
  return dispatch => {
    if (params.programId) {
      dispatch(fetchProgDetailReq());
    } else {
      dispatch(fetchOrgDetailReq());
    }
    let url = params.programId
      ? "/program/" + params.programId
      : "/organization/" + params.orgId;
    api(url, "GET", {}, true).then(
      response => {
        params.programId
          ? dispatch(fetchProgDetailSuccess(response))
          : dispatch(fetchOrgDetailSuccess(response));
      },
      error => {
        params.programId
          ? dispatch(fetchProgDetailError(error))
          : dispatch(fetchOrgDetailError(error));
      }
    );
  };
};

export const onSaveOrgBasicInfo = params => {
  return dispatch => {
    dispatch(saveOrgBasicInfoReq());
    api("/organization", "PUT", JSON.stringify(params), true).then(
      response => {
        dispatch(saveOrgBasicInfoSuccess(response));
      },
      error => {
        dispatch(saveOrgBasicInfoError(error));
      }
    );
  };
};

//Org Detail
function fetchOrgDetailReq() {
  return {
    type: FETCH_ORGDETAIL_REQUEST
  };
}

function fetchOrgDetailSuccess(response) {
  return {
    type: FETCH_ORGDETAIL_SUCCESS,
    response
  };
}

function fetchOrgDetailError(error) {
  return {
    type: FETCH_ORGDETAIL_ERROR,
    error
  };
}

//Prog Detail
function fetchProgDetailReq() {
  return {
    type: FETCH_PROGDETAIL_REQUEST
  };
}

function fetchProgDetailSuccess(response) {
  return {
    type: FETCH_PROGDETAIL_SUCCESS,
    response
  };
}

function fetchProgDetailError(error) {
  return {
    type: FECTH_PROGDETAIL_ERROR,
    error
  };
}

//Save Org Basic Info
function saveOrgBasicInfoReq() {
  return {
    type: SAVE_ORGDETAIL_BASIC_INFO_REQUEST
  };
}

function saveOrgBasicInfoSuccess(response) {
  return {
    type: SAVE_ORGDETAIL_BASIC_INFO_SUCCESS,
    response
  };
}

function saveOrgBasicInfoError(error) {
  return {
    type: SAVE_ORGDETAIL_BASIC_INFO_ERROR,
    error
  };
}
