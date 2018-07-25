import { FETCH_REGIONSERVED_PENDING, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR } from '../../constants/dispatch';

  const initialState = {
    regionsServedList: [],
    isregionsServedPending: false,
    isregionsServedSuccess: false,
    isregionsServedError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REGIONSERVED_PENDING:
        return Object.assign({}, state, {
            isregionsServedPending: action.isregionsServedPending
        });
      case FETCH_REGIONSERVED_SUCCESS:
        return Object.assign({}, state, {
            isregionsServedSuccess: action.isregionsServedSuccess,
            regionsServedList: action.regionsServedList
        });
      case FETCH_REGIONSERVED_ERROR:
        return Object.assign({}, state, {
            isregionsServedError: action.isregionsServedError
        });
  
      default:
        return state;
    }
  };