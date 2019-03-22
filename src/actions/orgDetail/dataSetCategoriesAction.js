import {
  FETCH_DATASET_CATEGORIES_REQUEST,
  FETCH_DATASET_CATEGORIES_SUCCESS,
  FETCH_DATASET_CATEGORIES_ERROR,
  DELETE_DATASET_REQUEST,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchDataSetCategories = () => {
  return dispatch => {
    dispatch(fetchDataSetCategoriesReq());
    api("/orgdataset/categorylist", "GET", {}, true).then(
      response => {
        dispatch(fetchDataSetCategoriesSuccess(response));
      },
      error => {
        dispatch(fetchDataSetCategoriesError(error));
      }
    );
  };
};

export const deleteOrgDataSet = ({ orgId, dataSetId }) => {
  return dispatch => {
    dispatch(deleteDataSetReq());
    const deleteObj = {
      id: dataSetId
    };
    api(
      `/organization/${orgId}/dataset`,
      "DELETE",
      JSON.stringify(deleteObj),
      true
    ).then(
      response => {
        dispatch(deleteDataSetSuccess(response));
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
