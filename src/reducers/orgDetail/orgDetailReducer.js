import {
  FETCH_ORGDETAIL_REQUEST,
  FETCH_ORGDETAIL_SUCCESS,
  FETCH_ORGDETAIL_ERROR,
  SAVE_ORGDETAIL_BASIC_INFO_REQUEST,
  SAVE_ORGDETAIL_BASIC_INFO_SUCCESS,
  SAVE_ORGDETAIL_BASIC_INFO_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORGDETAIL_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case FETCH_ORGDETAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FETCH_ORGDETAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_ORGDETAIL_BASIC_INFO_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_ORGDETAIL_BASIC_INFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.response,
        saveError: false
      });
    case SAVE_ORGDETAIL_BASIC_INFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });
    default:
      return state;
  }
};
