import { FETCH_NOTES_PENDING, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR } from '../../constants/dispatch';
import { fetchNotesApi } from '../../api/orgDetail/notesApi';
export const fetchOrgNotes = () => {
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
        });
    }
}

function fetchNotesPending(isNotesPending) {
    return {
        type: FETCH_NOTES_PENDING,
        isNotesPending
    }
}

function fetchNotesSuccess(isNotesSuccess, notesList) {
    return {
        type: FETCH_NOTES_SUCCESS,
        isNotesSuccess,
        notesList
    }
}

function fetchNotesError(isNotesError) {
    return {
        type: FETCH_NOTES_ERROR,
        isNotesError
    }
}