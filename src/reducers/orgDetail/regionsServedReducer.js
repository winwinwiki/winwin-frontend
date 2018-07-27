import { FETCH_REGIONSERVED_PENDING, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR,
    SET_REGIONSERVED_PENDING, SET_REGIONSERVED_SUCCESS, SET_REGIONSERVED_ERROR  } from '../../constants/dispatch';

  const initialState = {
    regionsServedList: [],
    isRegionsServedPending: false,
    isRegionsServedSuccess: false,
    isRegionsServedError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REGIONSERVED_PENDING:
      case SET_REGIONSERVED_PENDING:
        return Object.assign({}, state, {
            isRegionsServedPending: action.isRegionsServedPending
        });
      case FETCH_REGIONSERVED_SUCCESS:
      case SET_REGIONSERVED_SUCCESS:
        return Object.assign({}, state, {
            isRegionsServedSuccess: action.isRegionsServedSuccess,
            regionsServedList: action.regionsServedList
        });
      case FETCH_REGIONSERVED_ERROR:
      case SET_REGIONSERVED_ERROR:
        return Object.assign({}, state, {
            isRegionsServedError: action.isRegionsServedError
        });
  
      default:
        return state;
    }
  };