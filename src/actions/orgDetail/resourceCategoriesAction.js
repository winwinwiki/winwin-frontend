import {
  FETCH_RESOURCE_CATEGORIES_REQUEST,
  FETCH_RESOURCE_CATEGORIES_SUCCESS,
  FETCH_RESOURCE_CATEGORIES_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const fetchResourceCategories = (orgId, type) => {
  return dispatch => {
    dispatch(fetchResourceCategoriesReq());
    let url =
      type === PROGRAM
        ? `/program/${orgId}/resource/categorylist`
        : `/organization/${orgId}/resource/categorylist`;
    api(url, "GET", {}, true).then(
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
