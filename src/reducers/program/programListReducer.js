import {
  FETCH_PROG_REQUEST,
  FETCH_PROG_SUCCESS,
  FETCH_PROG_ERROR
} from "../../constants/dispatch";

const initialState = {
  isFetchProgramSuccess: false,
  isFetchProgramPending: false,
  fetchProgramError: null,
  programList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROG_REQUEST:
      return Object.assign({}, state, {
        isFetchProgramPending: true
      });

    case FETCH_PROG_SUCCESS:
      return Object.assign({}, state, {
        isFetchProgramSuccess: true,
        programList: action.response
      });

    case FETCH_PROG_ERROR:
      return Object.assign({}, state, {
        fetchProgramError: true
      });

    default:
      return state;
  }
};
