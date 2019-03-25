import {
  FETCH_RESOURCE_CATEGORIES_REQUEST,
  FETCH_RESOURCE_CATEGORIES_SUCCESS,
  FETCH_RESOURCE_CATEGORIES_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchResourceCategories = params => {
  return dispatch => {
    dispatch(fetchResourceCategoriesReq());
    api(
      `/organization/${params.orgId}/resource/categorylist`,
      "GET",
      {},
      true
    ).then(
      response => {
        dispatch(fetchResourceCategoriesSuccess(response));
      },
      error => {
        dispatch(fetchResourceCategoriesError(error));
      }
    );
  };
};

function fetchResourceCategoriesReq() {
  return {
    type: FETCH_RESOURCE_CATEGORIES_REQUEST
  };
}

function fetchResourceCategoriesSuccess(response) {
  return {
    type: FETCH_RESOURCE_CATEGORIES_SUCCESS,
    response
  };
}

function fetchResourceCategoriesError(error) {
  return {
    type: FETCH_RESOURCE_CATEGORIES_ERROR,
    error
  };
}
