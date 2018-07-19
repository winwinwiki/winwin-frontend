import {SET_APPLIED_FILTER,
    SET_APPLIED_FILTER_FLAG} from '../../constants/dispatch';
  
  const initialState = {
    appliedFilterList: [],
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
  
      default:
        return state;
    }
  };