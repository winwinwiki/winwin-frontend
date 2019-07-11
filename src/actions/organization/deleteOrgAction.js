import {
  DELETEORG_REQUEST,
  DELETEORG_SUCCESS,
  DELETEORG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onDeleteOrg = params => {
  return dispatch => {
    dispatch(deleteOrgRequest());
    const deleteObj = {
      id: params
    };
    api("/organization", "DELETE", JSON.stringify(deleteObj), true).then(
      response => {
        dispatch(deleteOrgSuccess(deleteObj.id));
      },
      error => {
        dispatch(deleteOrgError(error));
      }
    );
  };
};

function deleteOrgRequest() {
  return {
    type: DELETEORG_REQUEST
  };
}

function deleteOrgSuccess(response) {
  return {
    type: DELETEORG_SUCCESS,
    response
  };
}

function deleteOrgError(error) {
  return {
    type: DELETEORG_ERROR,
    error
  };
}
