import {
  DELETE_PROGRAM_REQUEST,
  DELETE_PROGRAM_SUCCESS,
  DELETE_PROGRAM_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const deleteProgram = (orgId, id, programId) => {
  return dispatch => {
    dispatch(deleteProgramReq());
    let apiObj = {
      id,
      programId
    };
    api(
      `/organization/${programId}/program`,
      "DELETE",
      JSON.stringify(apiObj),
      true
    ).then(
      response => {
        dispatch(deleteProgramSuccess(id));
      },
      error => {
        dispatch(deleteProgramError(error));
      }
    );
  };
};

function deleteProgramReq() {
  return {
    type: DELETE_PROGRAM_REQUEST
  };
}

function deleteProgramSuccess(response) {
  return {
    type: DELETE_PROGRAM_SUCCESS,
    response
  };
}

function deleteProgramError(error) {
  return {
    type: DELETE_PROGRAM_ERROR,
    error
  };
}
