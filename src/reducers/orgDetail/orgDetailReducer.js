import { SET_FETCHORGDETAIL_PENDING, SET_FETCHORGDETAIL_SUCCESS, SET_FECTHORGDETAIL_ERROR} from '../../constants/dispatch';
  
  const initialState = {
    isFetchOrgDetailSuccess: false,
    isFetchOrgDetailPending: false,
    fetchOrgDetailError: null,
    orgDetail: {}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FETCHORGDETAIL_PENDING:
        return Object.assign({}, state, {
            isFetchOrgDetailPending: action.isFetchOrgDetailPending
        });
  
      case SET_FETCHORGDETAIL_SUCCESS:
        return Object.assign({}, state, {
            isFetchOrgDetailSuccess: action.isFetchOrgDetailSuccess,
            orgDetail: action.orgDetail
        });
  
      case SET_FECTHORGDETAIL_ERROR:
        return Object.assign({}, state, {
            fetchOrgDetailError: action.fetchOrgDetailError
        });
  
      default:
        return state;
    }
  };