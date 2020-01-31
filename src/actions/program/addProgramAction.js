import {
  ADD_PROGRAM_REQUEST,
  ADD_PROGRAM_SUCCESS,
  ADD_PROGRAM_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onAddProgram = params => {
  return dispatch => {
    dispatch(addProgramReq());
    api(
      `/organization/${params.organizationId}/program`,
      "POST",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(addProgramSuccess(response));
      },
      error => {
        dispatch(addProgramError(error));
      }
    );
  };
};

function addProgramReq() {
  return {
    type: ADD_PROGRAM_REQUEST
  };
}

function addProgramSuccess(response) {
  return {
    type: ADD_PROGRAM_SUCCESS,
    response
  };
}

function addProgramError(error) {
  return {
    type: ADD_PROGRAM_ERROR,
    error
  };
}
