import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../../constants/dispatch";
// import { Auth } from "aws-amplify";
import { api } from "../../api/api";

export const onLogin = params => {
  return dispatch => {
    dispatch(loginRequest());
    const userObj = {
      userName: params.username,
      password: params.password
    };
    api("/user/login", "POST", JSON.stringify(userObj), false).then(
      response => {
        dispatch(loginSuccess(response));
      },
      error => {
        dispatch(loginError(error));
      }
    );
    //Temp
    // Auth.signIn(params.username, params.password).then(
    //   () => {
    //     return api("/login", "POST", params, false).then((response) => {
    //     Auth.currentAuthenticatedUser().then(user => {
    //       const { attributes } = user;
    //       const userObj = {
    //         id: attributes.sub,
    //         name: attributes["custom:fullName"],
    //         email: attributes.email,
    //         role: attributes["custom:role"],
    //         team: attributes["custom:team"]
    //       };
    //       dispatch(loginSuccess(userObj));
    //     });
    //   },
    //   error => {
    //     dispatch(loginError(error));
    //   }
    // );
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

function logout() {
  return {
    type: LOGOUT
  };
}
