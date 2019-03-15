import {
  CREATEORG_REQUEST,
  CREATEORG_SUCCESS,
  CREATEORG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onCreateOrg = params => {
  return dispatch => {
    dispatch(createOrgRequest());
    api("/organization/create", "POST", JSON.stringify(params), true).then(
      response => {
        dispatch(createOrgSuccess(response));
      },
      error => {
        dispatch(createOrgError(error));
      }
    );
  };
};

function createOrgRequest() {
  return {
    type: CREATEORG_REQUEST
  };
}

function createOrgSuccess(response) {
  return {
    type: CREATEORG_SUCCESS,
    response
  };
}

function createOrgError(error) {
  return {
    type: CREATEORG_ERROR,
    error
  };
}
