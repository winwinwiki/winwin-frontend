import {
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR,
  LOGGED_IN_USERINFO_REQUEST,
  LOGGED_IN_USERINFO_SUCCESS,
  LOGGED_IN_USERINFO_ERROR
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";
import { api } from "../../api/api";
import { USER } from "../../constants";
// export const fetchUserInfo = () => {
//   return dispatch => {
//     dispatch(userInfoRequest());
//     return Auth.currentAuthenticatedUser().then(
//       user => {
//         const { attributes } = user;
//         const responseObj = {
//           id: attributes.sub,
//           name: attributes["custom:fullName"],
//           email: attributes.email,
//           role: attributes["custom:role"],
//           team: attributes["custom:team"]
//         };
//         dispatch(userInfoSuccess(responseObj));
//       },
//       error => {
//         dispatch(userInfoError(error));
//       }
//     );
//   };
// };

export const fetchUserInfo = (email, userState) => {
  return dispatch => {
    if (USER.isUser === userState) dispatch(userInfoRequest());
    if (USER.isLoggedInUser === userState) dispatch(loggedInUserInfoRequest());
    return api("/user/info", "POST", JSON.stringify({ email }), true).then(
      response => {
        if (USER.isUser === userState) dispatch(userInfoSuccess(response));
        if (USER.isLoggedInUser === userState)
          dispatch(loggedInUserInfoSuccess(response));
      },
      error => {
        if (USER.isUser === userState) dispatch(userInfoError(error));
        if (USER.isLoggedInUser === userState)
          dispatch(loggedInUserInfoError(error));
      }
    );
  };
};

export function loggedInUserInfoRequest() {
  return {
    type: LOGGED_IN_USERINFO_REQUEST
  };
}

export function loggedInUserInfoSuccess(response) {
  return {
    type: LOGGED_IN_USERINFO_SUCCESS,
    response
  };
}

export function loggedInUserInfoError(error) {
  return {
    type: LOGGED_IN_USERINFO_ERROR,
    error
  };
}

export function userInfoRequest() {
  return {
    type: USERINFO_REQUEST
  };
}

export function userInfoSuccess(response) {
  return {
    type: USERINFO_SUCCESS,
    response
  };
}

export function userInfoError(error) {
  return {
    type: USERINFO_ERROR,
    error
  };
}
