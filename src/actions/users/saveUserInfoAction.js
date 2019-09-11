import {
  SAVEUSERINFO_REQUEST,
  SAVEUSERINFO_SUCCESS,
  SAVEUSERINFO_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { isUserProfile } from "../../constants";

export const onSaveUserInfo = (obj, params) => {
  return dispatch => {
    dispatch(saveUserInfoRequest());
    let url = params === isUserProfile ? "/user/update" : "/user/updateAll";
    return api(url, "PUT", JSON.stringify(obj), true).then(
      response => {
        dispatch(saveUserInfoSuccess(response));
      },
      error => {
        dispatch(saveUserInfoError(error));
      }
    );
  };
};

export const onUpdateUserActiveState = (obj, params) => {
  return dispatch => {
    dispatch(saveUserInfoRequest());
    let url = params === isUserProfile ? "/user/update" : "/user/updateAll";
    return api(url, "PUT", JSON.stringify(obj), true).then(
      response => {
        dispatch(saveUserInfoSuccess(response));
      },
      error => {
        dispatch(saveUserInfoError(error));
      }
    );
  };
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
