import {
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onResetPassword = (params, resendCode) => {
  return dispatch => {
    dispatch(rpRequest());
    let url = resendCode ? "/user/resetPassword" : "/user/confirmResetPassword";
    let customParams = resendCode
      ? { email: params.email || params.email.email }
      : params;
    api(url, "POST", JSON.stringify(customParams), true).then(
      response => {
        dispatch(rpSuccess(response, resendCode));
      },
      error => {
        dispatch(rpError(error));
      }
    );
  };
};

function rpRequest() {
  return {
    type: RESETPASSWORD_REQUEST
  };
}

function rpSuccess(response, resendCode) {
  return {
    type: RESETPASSWORD_SUCCESS,
    response,
    resendCode
  };
}

function rpError(error) {
  return {
    type: RESETPASSWORD_ERROR,
    error
  };
}
