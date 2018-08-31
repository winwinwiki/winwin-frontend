import { SET_FETCHORGHEIRARCHY_PENDING, SET_FETCHORGHEIRARCHY_SUCCESS, SET_FECTHORGHEIRARCHY_ERROR } from '../../constants/dispatch';
  
  const initialState = {
    isFetchOrgHierarchyPending: false,
    isFetchOrgHierarchySuccess: false,
    fetchOrgHierarchyError: null,
    orgHierarchy: {}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FETCHORGHEIRARCHY_PENDING:
        return Object.assign({}, state, {
            isFetchOrgHierarchyPending: action.isFetchOrgHierarchyPending
        });
  
      case SET_FETCHORGHEIRARCHY_SUCCESS:
        return Object.assign({}, state, {
            isFetchOrgHierarchySuccess: action.isFetchOrgHierarchySuccess,
            orgHierarchy: action.orgHierarchy
        });
  
      case SET_FECTHORGHEIRARCHY_ERROR:
        return Object.assign({}, state, {
            fetchOrgHierarchyError: action.fetchOrgHierarchyError
        });
  
      default:
        return state;
    }
  };