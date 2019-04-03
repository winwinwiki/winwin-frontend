import {
  FETCH_PROGDETAIL_REQUEST,
  FETCH_PROGDETAIL_SUCCESS,
  FECTH_PROGDETAIL_ERROR,
  SAVE_PROG_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROGDETAIL_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case FETCH_PROGDETAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case SAVE_PROG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FECTH_PROGDETAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
