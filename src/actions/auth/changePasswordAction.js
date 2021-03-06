import {
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_ERROR
} from "../../constants/dispatch";
import{getFromLocalStorage} from '../../util/util';
import { api } from "../../api/api";

export const onChangePassword = params => {
  return dispatch => {
    dispatch(changePasswordRequest());
    const accessToken = getFromLocalStorage("_auth", 'accessToken');
    const userObj = {
      accessToken,
      password: params.oldPassword,
      newPassword: params.newPassword
    };
    return api(
      "/user/changePassword",
      "PUT",
      JSON.stringify(userObj),
      true
    ).then(
      response => {
        dispatch(changePasswordSuccess(response));
      },
      error => {
        dispatch(changePasswordError(error));
      }
    );
  };
};

export const onNewUserChangePassword = params => {
  return dispatch => {
    dispatch(changePasswordRequest());
    return api("/user/login", "POST", JSON.stringify(params), false)
      .then(response => dispatch(changePasswordSuccess(response)))
      .catch(error => dispatch(changePasswordError(error)));
  };
};

function changePasswordRequest() {
  return {
    type: CHANGEPASSWORD_REQUEST
  };
}

function changePasswordSuccess(response) {
  return {
    type: CHANGEPASSWORD_SUCCESS,
    response
  };
}

function changePasswordError(error) {
  return {
    type: CHANGEPASSWORD_ERROR,
    error
  };
}
