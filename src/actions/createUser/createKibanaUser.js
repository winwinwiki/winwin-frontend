import {
  CREATE_KIBANA_USER_REQUEST,
  CREATE_KIBANA_USER_SUCCESS,
  CREATE_KIBANA_USER_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const createKibanaUser = params => {
  return dispatch => {
    dispatch(createKibanaUserRequest());
    api("/user/createKibanaUser", "POST", JSON.stringify(params), true).then(
      //to be integrated with api
      response => {
        dispatch(createKibanaUserSuccess(params));
      },
      error => {
        dispatch(createKibanaUserError(error));
      }
    );
  };
};

function createKibanaUserRequest() {
  return {
    type: CREATE_KIBANA_USER_REQUEST
  };
}

function createKibanaUserSuccess(response) {
  return {
    type: CREATE_KIBANA_USER_SUCCESS,
    response
  };
}

function createKibanaUserError(error) {
  return {
    type: CREATE_KIBANA_USER_ERROR,
    error
  };
}
