import { SET_DATAFEED_PENDING, SET_DATAFEED_SUCCESS, SET_DATAFEED_ERROR, SET_DATAFEEDFORM_ERROR } from '../../constants/dispatch';
const initialState = {
    isDataFeedSuccess: false,
    isDataFeedPending: false,
    dataFeedError: null,
    dataFeedFormError: {
      file: '',
      location: ''
    }
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_DATAFEED_PENDING:
        return Object.assign({}, state, {
          isDataFeedPending: action.isDataFeedPending
        });
  
      case SET_DATAFEED_SUCCESS:
        return Object.assign({}, state, {
          isDataFeedSuccess: action.isDataFeedSuccess
        });
  
      case SET_DATAFEED_ERROR:
        return Object.assign({}, state, {
          dataFeedError: action.dataFeedError
        });
      case SET_DATAFEEDFORM_ERROR:
        let formErrorVal = Object.assign({}, state.dataFeedFormError, action.dataFeedFormError);
        return Object.assign({}, state, {dataFeedFormError: formErrorVal});
  
      default:
        return state;
    }
  };