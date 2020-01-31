import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onLogin = params => {
  return dispatch => {
    dispatch(loginRequest());
    const userObj = {
      userName: params.username,
      password: params.password
    };
    api("/user/login", "POST", JSON.stringify(userObj), false)
      .then(response => dispatch(loginSuccess(response)))
      .catch(error => dispatch(loginError(error)));
  };
};

export const logoutAction = () => {
  return dispatch => {
    // Auth.signOut().then(dispatch(logout()));
    dispatch(logout());
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

export function logout() {
  return {
    type: LOGOUT
  };
}
