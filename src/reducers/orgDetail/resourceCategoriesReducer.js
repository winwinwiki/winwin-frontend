import {
  FETCH_RESOURCE_CATEGORIES_REQUEST,
  FETCH_RESOURCE_CATEGORIES_SUCCESS,
  FETCH_RESOURCE_CATEGORIES_ERROR,
  SAVE_RESOURCE_CATEGORIES_REQUEST,
  SAVE_RESOURCE_CATEGORIES_SUCCESS,
  SAVE_RESOURCE_CATEGORIES_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false,
  saveData: null,
  saveError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_RESOURCE_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_RESOURCE_CATEGORIES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_RESOURCE_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_RESOURCE_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.response,
        saveError: false
      });
    case SAVE_RESOURCE_CATEGORIES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });

    default:
      return state;
  }
};
