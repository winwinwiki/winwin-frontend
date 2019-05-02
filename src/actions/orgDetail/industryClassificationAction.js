import {
  FETCH_NAICS_LIST_REQUEST,
  FETCH_NAICS_LIST_SUCCESS,
  FETCH_NAICS_LIST_ERROR,
  FETCH_NTEE_LIST_REQUEST,
  FETCH_NTEE_LIST_SUCCESS,
  FETCH_NTEE_LIST_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchNAICSList = () => {
  return dispatch => {
    dispatch(fetchNAICSListReq());
    let url = "/organization/naics_data";
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchNAICSListSuccess(response));
      },
      error => {
        dispatch(fetchNAICSListError(error));
      }
    );
  };
};

export const fetchNTEEList = () => {
  return dispatch => {
    dispatch(fetchNTEEListReq());
    let url = "/organization/ntee_data";
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchNTEEListSuccess(response));
      },
      error => {
        dispatch(fetchNTEEListError(error));
      }
    );
  };
};

function fetchNAICSListReq() {
  return {
    type: FETCH_NAICS_LIST_REQUEST
  };
}

function fetchNAICSListSuccess(response) {
  return {
    type: FETCH_NAICS_LIST_SUCCESS,
    response
  };
}

function fetchNAICSListError(error) {
  return {
    type: FETCH_NAICS_LIST_ERROR,
    error
  };
}

function fetchNTEEListReq() {
  return {
    type: FETCH_NTEE_LIST_REQUEST
  };
}

function fetchNTEEListSuccess(response) {
  return {
    type: FETCH_NTEE_LIST_SUCCESS,
    response
  };
}

function fetchNTEEListError(error) {
  return {
    type: FETCH_NTEE_LIST_ERROR,
    error
  };
}
