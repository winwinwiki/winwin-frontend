import {
  FETCH_DATASET_CATEGORIES_REQUEST,
  FETCH_DATASET_CATEGORIES_SUCCESS,
  FETCH_DATASET_CATEGORIES_ERROR,
  DELETE_DATASET_REQUEST,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const fetchDataSetCategories = (orgId, type) => {
  return dispatch => {
    dispatch(fetchDataSetCategoriesReq());
    let url =
      type === PROGRAM
        ? `/program/${orgId}/dataset/categorylist`
        : `/organization/${orgId}/dataset/categorylist`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(fetchDataSetCategoriesSuccess(response));
      },
      error => {
        dispatch(fetchDataSetCategoriesError(error));
      }
    );
  };
};

export const deleteOrgDataSet = (
  orgId,
  dataSetId,
  type,
  filteredList,
  programId
) => {
  return dispatch => {
    dispatch(deleteDataSetReq());
    const deleteObj = {
      id: dataSetId
    };
    if (type === PROGRAM) {
      deleteObj.programId = programId;
      deleteObj.organizationId = orgId;
    }
    let url =
      type === PROGRAM
        ? `/program/${programId}/dataset`
        : `/organization/${orgId}/dataset`;
    api(url, "DELETE", JSON.stringify(deleteObj), true).then(
      response => {
        dispatch(deleteDataSetSuccess(filteredList));
      },
      error => {
        dispatch(deleteDataSetError(error));
      }
    );
  };
};

function fetchDataSetCategoriesReq() {
  return {
    type: FETCH_DATASET_CATEGORIES_REQUEST
  };
}

function fetchDataSetCategoriesSuccess(response) {
  return {
    type: FETCH_DATASET_CATEGORIES_SUCCESS,
    response
  };
}

function fetchDataSetCategoriesError(error) {
  return {
    type: FETCH_DATASET_CATEGORIES_ERROR,
    error
  };
}

function deleteDataSetReq() {
  return {
    type: DELETE_DATASET_REQUEST
  };
}

function deleteDataSetSuccess(response) {
  return {
    type: DELETE_DATASET_SUCCESS,
    response
  };
}

function deleteDataSetError(error) {
  return {
    type: DELETE_DATASET_ERROR,
    error
  };
}
