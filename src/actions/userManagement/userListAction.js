import {
  SET_FETCHUSER_PENDING,
  SET_FETCHUSER_SUCCESS,
  SET_FETCHUSER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchUsersList = () => {
  return dispatch => {
    dispatch(setFetchUserPending());
    api("/user", "GET", {}, true).then(
      response => {
        dispatch(setFetchUserSuccess(response));
      },
      error => {
        dispatch(setFetchUserError(error));
      }
    );
  };
  //   return dispatch => {
  //     dispatch(setFetchUserPending(true));
  //     dispatch(setFetchUserSuccess(false, []));
  //     dispatch(setFetchUserError(null));

  //     callFetchUserListApi((error, userList) => {
  //       dispatch(setFetchUserPending(false));
  //       if (!error) {
  //         dispatch(setFetchUserSuccess(true, userList));
  //       } else {
  //         dispatch(setFetchUserError(error));
  //       }
  //     });
  //   };
};

export const deleteUser = params => {
  return dispatch => {
    dispatch(deleteUserPending());
    api("/user", "DELETE", JSON.stringify(params), true).then(
      response => {
        dispatch(deleteUserSuccess(params));
      },
      error => {
        dispatch(deleteUserError(error));
      }
    );
  };
};

function setFetchUserPending() {
  return {
    type: SET_FETCHUSER_PENDING
  };
}

function setFetchUserSuccess(response) {
  return {
    type: SET_FETCHUSER_SUCCESS,
    response
  };
}

function setFetchUserError(fetchUserError) {
  return {
    type: SET_FETCHUSER_ERROR,
    fetchUserError
  };
}

function deleteUserPending() {
  return {
    type: DELETE_USER_REQUEST
  };
}

function deleteUserSuccess(response) {
  return {
    type: DELETE_USER_SUCCESS,
    response
  };
}

function deleteUserError(fetchUserError) {
  return {
    type: DELETE_USER_ERROR,
    fetchUserError
  };
}
