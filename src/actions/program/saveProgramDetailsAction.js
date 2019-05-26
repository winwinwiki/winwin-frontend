import {
  SAVE_PROG_REQUEST,
  SAVE_PROG_SUCCESS,
  SAVE_PROG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const saveProgramDetailsAction = params => {
  return dispatch => {
    dispatch(saveProgRequest());
    api(
      `/organization/${params[0].orgId}/program`,
      "PUT",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(saveProgSuccess(response));
      },
      error => {
        dispatch(saveProgError(error));
      }
    );
  };
};

function saveProgRequest() {
  return {
    type: SAVE_PROG_REQUEST
  };
}

function saveProgSuccess(response) {
  return {
    type: SAVE_PROG_SUCCESS,
    response
  };
}

function saveProgError(error) {
  return {
    type: SAVE_PROG_ERROR,
    error
  };
}
