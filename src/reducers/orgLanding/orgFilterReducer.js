import {SET_APPLIED_FILTER,
    SET_APPLIED_FILTER_FLAG, SET_FILTERED_LIST_ERROR, SET_FILTERED_LIST_SUCCESS, SET_FILTERED_LIST_PENDING} from '../../constants/dispatch';
  
  const initialState = {
    appliedFilterList: [],
    isFilteredListPending: false,
    isFilteredListSuccess: false,
    isFilteredListError: null,
    isAppliedFilterVisible: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
  
      case SET_APPLIED_FILTER:
        return Object.assign({}, state, {
          appliedFilterList:action.appliedFilterList
      });
  
      case SET_APPLIED_FILTER_FLAG:
        return Object.assign({}, state, {
          isAppliedFilterVisible:action.isAppliedFilterVisible
      });
      case SET_FILTERED_LIST_PENDING:
      return Object.assign({}, state, {
        isFilteredListPending: action.isFilteredListPending
      });
      case SET_FILTERED_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFilteredListSuccess: action.isFilteredListSuccess,
        orgList: action.orgList
      });
      case SET_FILTERED_LIST_ERROR:
      return Object.assign({}, state, {
        isFilteredListError: action.isFilteredListError
      });
  
      default:
        return state;
    }
  };