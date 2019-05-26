import {
  FETCH_DATASET_REQUEST,
  FETCH_DATASET_SUCCESS,
  FETCH_DATASET_ERROR,
  SAVE_DATASET_REQUEST,
  SAVE_DATASET_SUCCESS,
  SAVE_DATASET_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const saveOrgDataSets = (params, type) => {
  return dispatch => {
    dispatch(saveDataSetReq());
    let url =
      type === PROGRAM
        ? `/program/${params.programId}/dataset`
        : `/organization/${params.organizationId}/dataset`;
    if (!params.id) {
      api(url, "POST", JSON.stringify(params), true).then(
        response => {
          dispatch(saveDataSetSuccess(response));
        },
        error => {
          dispatch(saveDataSetError(error));
        }
      );
    } else {
      api(url, "PUT", JSON.stringify(params), true).then(
        response => {
          dispatch(saveDataSetSuccess(response));
        },
        error => {
          dispatch(saveDataSetError(error));
        }
      );
    }
  };
};

export const fetchOrgDataSets = (params, type) => {
  return dispatch => {
    dispatch(fetchDataSetReq());
    let url =
      type === PROGRAM
        ? `/program/${params}/datasets`
        : `/organization/${params}/datasets`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchDataSetSuccess(response));
      },
      error => {
        dispatch(fetchDataSetError(error));
      }
    );
  };
};

function fetchDataSetReq() {
  return {
    type: FETCH_DATASET_REQUEST
  };
}

function fetchDataSetSuccess(response) {
  return {
    type: FETCH_DATASET_SUCCESS,
    response
  };
}

function fetchDataSetError(error) {
  return {
    type: FETCH_DATASET_ERROR,
    error
  };
}

function saveDataSetReq() {
  return {
    type: SAVE_DATASET_REQUEST
  };
}

function saveDataSetSuccess(response) {
  return {
    type: SAVE_DATASET_SUCCESS,
    response
  };
}

function saveDataSetError(error) {
  return {
    type: SAVE_DATASET_ERROR,
    error
  };
}
