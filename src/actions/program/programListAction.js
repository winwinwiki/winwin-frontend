import {
  FETCH_PROG_REQUEST,
  FETCH_PROG_SUCCESS,
  FETCH_PROG_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchProgramsList = orgId => {
  return dispatch => {
    dispatch(fetchProgRequest());
    api(`/organization/${orgId}/program`, "GET", {}, true).then(
      response => {
        dispatch(fetchProgSuccess(response));
      },
      error => {
        dispatch(fetchProgError(error));
      }
    );
  };
};

function fetchProgRequest() {
  return {
    type: FETCH_PROG_REQUEST
  };
}

function fetchProgSuccess(response) {
  return {
    type: FETCH_PROG_SUCCESS,
    response
  };
}

function fetchProgError(error) {
  return {
    type: FETCH_PROG_ERROR,
    error
  };
}
