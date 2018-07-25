import { FETCH_SDGTAGS_ERROR, FETCH_SDGTAGS_SUCCESS, FETCH_SDGTAGS_PENDING } from '../../constants/dispatch';
  
  const initialState = {
    sdgTagsList: [],
    isSdgTagsPending: false,
    isSdgTagsSuccess: false,
    isSdgTagsError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SDGTAGS_PENDING:
        return Object.assign({}, state, {
            isSdgTagsPending: action.isSdgTagsPending
        });
      case FETCH_SDGTAGS_SUCCESS:
        return Object.assign({}, state, {
            isSdgTagsSuccess: action.isSdgTagsSuccess,
            sdgTagsList: action.sdgTagsList
        });
      case FETCH_SDGTAGS_ERROR:
        return Object.assign({}, state, {
            isSdgTagsError: action.isSdgTagsError
        });
  
      default:
        return state;
    }
  };