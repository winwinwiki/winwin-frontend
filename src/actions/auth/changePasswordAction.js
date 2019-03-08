import {
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_ERROR
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";

export const onChangePassword = params => {
  return dispatch => {
    dispatch(cpRequest());
    Auth.changePassword(
      params.currentUser,
      params.oldPassword,
      params.newPassword
    ).then(
      response => {
        dispatch(cpSuccess(response));
      },
      error => {
        dispatch(cpError(error));
      }
    );
  };
};

function cpRequest() {
  return {
    type: CHANGEPASSWORD_REQUEST
  };
}

function cpSuccess(response) {
  return {
    type: CHANGEPASSWORD_SUCCESS,
    response
  };
}

function cpError(error) {
  return {
    type: CHANGEPASSWORD_ERROR,
    error
  };
}
