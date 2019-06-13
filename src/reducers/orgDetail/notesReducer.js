import {
  FETCH_NOTES_PENDING,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  SAVE_NOTES_SUCCESS,
  DELETE_NOTES_SUCCESS
} from "../../constants/dispatch";

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
    case SAVE_NOTES_SUCCESS:
      return {
        ...state,
        notesList: {
          ...state.notesList,
          response: [...state.notesList.response, action.response.response]
        }
      };
    case DELETE_NOTES_SUCCESS:
      return {
        ...state,
        notesList: {
          ...state.notesList,
          response: state.notesList.response.filter(
            x => x.id !== action.noteId
          )
        }
      };
    case FETCH_NOTES_ERROR:
      return Object.assign({}, state, {
        isNotesError: action.isNotesError
      });

    default:
      return state;
  }
};
