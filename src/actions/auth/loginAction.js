import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";

export const onLogin = params => {
  return dispatch => {
    dispatch(loginRequest());
    //Temp
    Auth.signIn(params.username, params.password).then(
      response => {
        //return api("/login", "POST", params, false).then((response) => {
        dispatch(loginSuccess(response));
      },
      error => {
        dispatch(loginError(error));
      }
    );
  };
};

export const logoutAction = () => {
  return dispatch => {
    Auth.signOut().then(dispatch(logout()));
  };
};

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    response
  };
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}
