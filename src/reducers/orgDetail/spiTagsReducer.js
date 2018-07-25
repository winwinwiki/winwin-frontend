import { FETCH_SPITAGS_ERROR, FETCH_SPITAGS_SUCCESS, FETCH_SPITAGS_PENDING } from '../../constants/dispatch';
  
  const initialState = {
    spiTagsList: [],
    isSpiTagsPending: false,
    isSpiTagsSuccess: false,
    isSpiTagsError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SPITAGS_PENDING:
        return Object.assign({}, state, {
            isSpiTagsPending: action.isSpiTagsPending
        });
      case FETCH_SPITAGS_SUCCESS:
        return Object.assign({}, state, {
            isSpiTagsSuccess: action.isSpiTagsSuccess,
            spiTagsList: action.spiTagsList
        });
      case FETCH_SPITAGS_ERROR:
        return Object.assign({}, state, {
            isSpiTagsError: action.isSpiTagsError
        });
  
      default:
        return state;
    }
  };