import {
  CREATEUSER_REQUEST,
  CREATEUSER_SUCCESS,
  CREATEUSER_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onCreateUser = params => {
  return dispatch => {
    dispatch(createUserRequest());
    api("/user", "POST", JSON.stringify(params), true).then(
      //to be integrated with api
      response => {
        dispatch(createUserSuccess(params));
      },
      error => {
        dispatch(createUserError(error));
      }
    );
  };
};

function createUserRequest() {
  return {
    type: CREATEUSER_REQUEST
  };
}

function createUserSuccess(response) {
  return {
    type: CREATEUSER_SUCCESS,
    response
  };
}

function createUserError(error) {
  return {
    type: CREATEUSER_ERROR,
    error
  };
}
