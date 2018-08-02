import { FETCH_DATASET_PENDING, FETCH_DATASET_SUCCESS, FETCH_DATASET_ERROR,
    SET_DATASET_PENDING, SET_DATASET_SUCCESS, SET_DATASET_ERROR  } from '../../constants/dispatch';

  const initialState = {
    dataSetList: [],
    isDataSetPending: false,
    isDataSetSuccess: false,
    isDataSetError: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATASET_PENDING:
      case SET_DATASET_PENDING:
        return Object.assign({}, state, {
            isDataSetPending: action.isDataSetPending
        });
      case FETCH_DATASET_SUCCESS:
      case SET_DATASET_SUCCESS:
        return Object.assign({}, state, {
            isDataSetSuccess: action.isDataSetSuccess,
            dataSetList: action.dataSetList
        });
      case FETCH_DATASET_ERROR:
      case SET_DATASET_ERROR:
        return Object.assign({}, state, {
            isDataSetError: action.isDataSetError
        });
  
      default:
        return state;
    }
  };