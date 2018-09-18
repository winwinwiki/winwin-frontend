import { FETCH_NOTES_PENDING, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR } from '../../constants/dispatch';

  const initialState = {
    notesList: null,
    isNotesPending: false,
    isNotesSuccess: false,
    isNotesError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTES_PENDING:
        return Object.assign({}, state, {
            isNotesPending: action.isNotesPending
        });
      case FETCH_NOTES_SUCCESS:
        return Object.assign({}, state, {
            isNotesSuccess: action.isNotesSuccess,
            notesList: action.notesList
        });
      case FETCH_NOTES_ERROR:
        return Object.assign({}, state, {
            isNotesError: action.isNotesError
        });
  
      default:
        return state;
    }
  };