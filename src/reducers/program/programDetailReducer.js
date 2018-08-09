import { SET_FETCHPROGDETAIL_PENDING, SET_FETCHPROGDETAIL_SUCCESS, SET_FECTHPROGDETAIL_ERROR} from '../../constants/dispatch';
  
  const initialState = {
    isFetchProgDetailSuccess: false,
    isFetchProgDetailPending: false,
    fetchProgDetailError: null,
    programDetail: {}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FETCHPROGDETAIL_PENDING:
        return Object.assign({}, state, {
            isFetchProgDetailPending: action.isFetchProgDetailPending
        });
  
      case SET_FETCHPROGDETAIL_SUCCESS:
        return Object.assign({}, state, {
            isFetchProgDetailSuccess: action.isFetchProgDetailSuccess,
            programDetail: action.progDetail
        });
  
      case SET_FECTHPROGDETAIL_ERROR:
        return Object.assign({}, state, {
            fetchProgDetailError: action.fetchProgDetailError
        });
  
      default:
        return state;
    }
  };