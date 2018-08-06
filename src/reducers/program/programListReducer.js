import { SET_FETCHPROGRAM_PENDING, SET_FETCHPROGRAM_SUCCESS, SET_FECTHPROGRAM_ERROR} from '../../constants/dispatch';
  
  const initialState = {
    isFetchProgramSuccess: false,
    isFetchProgramPending: false,
    fetchProgramError: null,
    programList: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FETCHPROGRAM_PENDING:
        return Object.assign({}, state, {
            isFetchProgramPending: action.isFetchProgramPending
        });
  
      case SET_FETCHPROGRAM_SUCCESS:
        return Object.assign({}, state, {
            isFetchProgramSuccess: action.isFetchProgramSuccess,
            programList: action.programList
        });
  
      case SET_FECTHPROGRAM_ERROR:
        return Object.assign({}, state, {
            fetchProgramError: action.fetchProgramError
        });
  
      default:
        return state;
    }
  };