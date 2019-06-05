import {
  FETCH_NOTES_PENDING,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  DELETE_NOTES_PENDING,
  DELETE_NOTES_SUCCESS,
  DELETE_NOTES_ERROR,
  SAVE_NOTES_REQ,
  SAVE_NOTES_SUCCESS,
  SAVE_NOTES_ERROR,
  UPDATE_NOTES_PENDING,
  UPDATE_NOTES_SUCCESS,
  UPDATE_NOTES_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
export const fetchOrgNotes = orgId => {
  return dispatch => {
    dispatch(fetchNotesPending());
    api(`/organization/${orgId}/notes`, "GET", {}, true).then(
      response => {
        dispatch(fetchNotesSuccess(response));
      },
      error => {
        dispatch(fetchNotesError(error));
      }
    );
  };
};

export const saveNote = params => {
  return dispatch => {
    dispatch(saveNoteReq());
    api(
      `/organization/${params.organizationId}/notes`,
      "POST",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(saveNoteSuccess(response));
      },
      error => {
        dispatch(saveNoteError(error));
      }
    );
  };
};

export const updateNote = params => {
  return dispatch => {
    dispatch(updateNotesPending());
    api(
      `/organization/${params.organizationId}/notes`,
      "PUT",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(updateNotesSuccess(response));
      },
      error => {
        dispatch(updateNotesError(error));
      }
    );
  };
};

export const deleteNote = params => {
  return dispatch => {
    dispatch(deleteNotesPending());
    api(
      `/organization/${params.organizationId}/notes`,
      "DELETE",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(deleteNotesSuccess(response, params.noteId));
      },
      error => {
        dispatch(deleteNotesError(error));
      }
    );
  };
};

function fetchNotesPending() {
  return {
    type: FETCH_NOTES_PENDING
  };
}

function fetchNotesSuccess(notesList) {
  return {
    type: FETCH_NOTES_SUCCESS,
    isNotesSuccess: true,
    notesList
  };
}

function fetchNotesError(isNotesError) {
  return {
    type: FETCH_NOTES_ERROR,
    isNotesError
  };
}

function deleteNotesPending() {
  return {
    type: DELETE_NOTES_PENDING
  };
}

function deleteNotesSuccess(response, noteId) {
  return {
    type: DELETE_NOTES_SUCCESS,
    response,
    noteId
  };
}

function deleteNotesError(error) {
  return {
    type: DELETE_NOTES_ERROR,
    error
  };
}

function saveNoteReq() {
  return {
    type: SAVE_NOTES_REQ
  };
}

function saveNoteSuccess(response) {
  return {
    type: SAVE_NOTES_SUCCESS,
    response
  };
}

function saveNoteError(error) {
  return {
    type: SAVE_NOTES_ERROR,
    error
  };
}

function updateNotesPending() {
  return {
    type: UPDATE_NOTES_PENDING
  };
}

function updateNotesSuccess(response) {
  return {
    type: UPDATE_NOTES_SUCCESS,
    response
  };
}

function updateNotesError(error) {
  return {
    type: UPDATE_NOTES_ERROR,
    error
  };
}
