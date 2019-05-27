import {
  CREATE_BULK_ORG_REQUEST,
  CREATE_BULK_ORG_SUCCESS,
  CREATE_BULK_ORG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onCreateBulkOrg = ({ file }) => {
  return dispatch => {
    dispatch(createBulkRequest());
    api("/organization/addAll", "POST", file, true, "multipart/form-data").then(
      response => {
        dispatch(createBulkSuccess(response));
      },
      error => {
        dispatch(createBulkError(error));
      }
    );
  };
};

function createBulkRequest() {
  return {
    type: CREATE_BULK_ORG_REQUEST
  };
}

function createBulkSuccess(response) {
  return {
    type: CREATE_BULK_ORG_SUCCESS,
    response
  };
}

function createBulkError(error) {
  return {
    type: CREATE_BULK_ORG_ERROR,
    error
  };
}
