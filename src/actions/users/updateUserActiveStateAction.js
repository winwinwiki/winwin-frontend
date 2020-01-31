import {
  UPDATE_USER_ACTIVE_STATE_REQUEST,
  UPDATE_USER_ACTIVE_STATE_SUCCESS,
  UPDATE_USER_ACTIVE_STATE_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onUpdateUserActiveState = (userList, isActive) => {
  return dispatch => {
    dispatch(updateUserActiveRequest());
    const url = "/user/changeUserStatus";
    const body = {
      userNames: userList,
      isActive: isActive
    }
    return api(url, "PUT", JSON.stringify(body), true)
      .then(response => {
        console.log('onUpdateUserActiveState response',response);
        dispatch(updateUserActiveSuccess(response));
      },
        error => {
          console.log('onUpdateUserActiveState error', error);
        dispatch(updateUserActiveError(error));
      }
    );
  };
};

function updateUserActiveRequest() {
  return {
    type: UPDATE_USER_ACTIVE_STATE_REQUEST
  };
}

function updateUserActiveSuccess(response) {
  return {
    type: UPDATE_USER_ACTIVE_STATE_SUCCESS,
    response
  };
}

function updateUserActiveError(error) {
  return {
    type: UPDATE_USER_ACTIVE_STATE_ERROR,
    error
  };
}
