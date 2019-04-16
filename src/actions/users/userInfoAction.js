import {
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";
import { api } from "../../api/api";
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

export const fetchUserInfo = email => {
  return dispatch => {
    dispatch(userInfoRequest());
    return api("/user/info", "POST", JSON.stringify({ email }), false).then(
      response => {
        dispatch(userInfoSuccess(response));
      },
      error => {
        dispatch(userInfoError(error));
      }
    );
  };
};

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
