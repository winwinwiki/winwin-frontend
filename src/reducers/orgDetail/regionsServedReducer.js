import {
  FETCH_REGIONSERVED_REQUEST, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR,
  SAVE_REGIONSERVED_REQUEST, SAVE_REGIONSERVED_SUCCESS, SAVE_REGIONSERVED_ERROR
} from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false,
  saveData: null,
  saveError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONSERVED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_REGIONSERVED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_REGIONSERVED_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_REGIONSERVED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_REGIONSERVED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.response,
        saveError: false
      });
    case SAVE_REGIONSERVED_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });
    default:
      return state;
  }
};