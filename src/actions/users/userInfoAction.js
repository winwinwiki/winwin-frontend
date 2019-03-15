import {
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";

export const fetchUserInfo = () => {
  return dispatch => {
    dispatch(userInfoRequest());
    return Auth.currentAuthenticatedUser().then(
      user => {
        const { attributes } = user;
        const responseObj = {
          id: attributes.sub,
          name: attributes["custom:fullName"],
          email: attributes.email,
          role: attributes["custom:role"],
          team: attributes["custom:team"]
        };
        dispatch(userInfoSuccess(responseObj));
      },
      error => {
        dispatch(userInfoError(error));
      }
    );
  };
};

function userInfoRequest() {
  return {
    type: USERINFO_REQUEST
  };
}

function userInfoSuccess(response) {
  return {
    type: USERINFO_SUCCESS,
    response
  };
}

function userInfoError(error) {
  return {
    type: USERINFO_ERROR,
    error
  };
}
