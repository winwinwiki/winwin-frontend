import {
  FETCH_PROG_REQUEST,
  FETCH_PROG_SUCCESS,
  FETCH_PROG_ERROR,
  FILTER_PROG_REQUEST,
  FILTER_PROG_SUCCESS,
  FILTER_PROG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import qs from "qs";

export const fetchProgramsList = orgId => {
  return dispatch => {
    dispatch(fetchProgRequest());
    api(`/organization/${orgId}/program`, "GET", {}, true).then(
      response => {
        dispatch(fetchProgSuccess(response));
      },
      error => {
        dispatch(fetchProgError(error));
      }
    );
  };
};

export const filterProgramsList = (orgId, params) => {
  return dispatch => {
    dispatch(filterProgramsRequest());
    let queryString = qs.stringify(params);
    api(
      `/organization/${orgId}/program${queryString ? "?" + queryString : ""}`,
      "GET",
      {},
      true
    ).then(
      response => {
        dispatch(filterProgramsSuccess(response));
      },
      error => {
        dispatch(filterProgramsError(error));
      }
    );
  };
};

function fetchProgRequest() {
  return {
    type: FETCH_PROG_REQUEST
  };
}

function fetchProgSuccess(response) {
  return {
    type: FETCH_PROG_SUCCESS,
    response
  };
}

function fetchProgError(error) {
  return {
    type: FETCH_PROG_ERROR,
    error
  };
}

function filterProgramsRequest() {
  return {
    type: FILTER_PROG_REQUEST
  };
}

function filterProgramsSuccess(response) {
  return {
    type: FILTER_PROG_SUCCESS,
    response
  };
}

function filterProgramsError(error) {
  return {
    type: FILTER_PROG_ERROR,
    error
  };
}
