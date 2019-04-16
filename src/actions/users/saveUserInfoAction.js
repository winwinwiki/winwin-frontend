import {
  SAVEUSERINFO_REQUEST,
  SAVEUSERINFO_SUCCESS,
  SAVEUSERINFO_ERROR
} from "../../constants/dispatch";
import { Auth } from "aws-amplify";
import { api } from "../../api/api";

export const onSaveUserInfo = obj => {
  return dispatch => {
    dispatch(saveUserInfoRequest());
    return api("/user/updateInfo", "POST", JSON.stringify(obj), false).then(
      response => {
        dispatch(saveUserInfoSuccess(response));
      },
      error => {
        dispatch(saveUserInfoError(error));
      }
    );
  };
  // return dispatch => {
  //   dispatch(saveUserInfoRequest());
  //   return Auth.currentAuthenticatedUser().then(
  //     user => {
  //       obj.profileImage = profileImage;
  //       const { name, role, team } = obj;
  //       const responseObj = {
  //         "custom:fullName": name,
  //         "custom:role": role,
  //         "custom:team": team
  //       };
  //       Auth.updateUserAttributes(user, responseObj);

  //       dispatch(saveUserInfoSuccess(obj));
  //     },
  //     error => {
  //       dispatch(saveUserInfoError(error));
  //     }
  //   );
  // };
};

function saveUserInfoRequest() {
  return {
    type: SAVEUSERINFO_REQUEST
  };
}

function saveUserInfoSuccess(response) {
  return {
    type: SAVEUSERINFO_SUCCESS,
    response
  };
}

function saveUserInfoError(error) {
  return {
    type: SAVEUSERINFO_ERROR,
    error
  };
}
