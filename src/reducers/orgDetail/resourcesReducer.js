import { FETCH_RESOURCES_PENDING, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR,
    SET_RESOURCES_PENDING, SET_RESOURCES_SUCCESS, SET_RESOURCES_ERROR  } from '../../constants/dispatch';

  const initialState = {
    resourcesList: [],
    isResourcesPending: false,
    isResourcesSuccess: false,
    isResourcesError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESOURCES_PENDING:
      case SET_RESOURCES_PENDING:
        return Object.assign({}, state, {
            isResourcesPending: action.isResourcesPending
        });
      case FETCH_RESOURCES_SUCCESS:
      case SET_RESOURCES_SUCCESS:
        return Object.assign({}, state, {
            isResourcesSuccess: action.isResourcesSuccess,
            resourcesList: action.resourcesList
        });
      case FETCH_RESOURCES_ERROR:
      case SET_RESOURCES_ERROR:
        return Object.assign({}, state, {
            isResourcesError: action.isResourcesError
        });
  
      default:
        return state;
    }
  };