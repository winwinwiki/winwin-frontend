import {
  FETCH_NOTES_PENDING,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  DELETE_NOTES_PENDING,
  DELETE_NOTES_SUCCESS,
  DELETE_NOTES_ERROR,
  SAVE_NOTES_REQ,
  SAVE_NOTES_SUCCESS,
  SAVE_NOTES_ERROR
} from "../../constants/dispatch";
import { fetchNotesApi } from "../../api/orgDetail/notesApi";
import { api } from "../../api/api";
export const fetchOrgNotes = orgId => {
  return dispatch => {
    dispatch(fetchNotesPending(true));
    dispatch(fetchNotesSuccess(false, []));
    dispatch(fetchNotesError(null));

    fetchNotesApi((error, notesList) => {
      dispatch(fetchNotesPending(false));
      if (!error) {
        dispatch(fetchNotesSuccess(true, notesList));
      } else {
        dispatch(fetchNotesError(error));
      }
    }, orgId);
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

function fetchNotesPending(isNotesPending) {
  return {
    type: FETCH_NOTES_PENDING,
    isNotesPending
  };
}

function fetchNotesSuccess(isNotesSuccess, notesList) {
  return {
    type: FETCH_NOTES_SUCCESS,
    isNotesSuccess,
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
