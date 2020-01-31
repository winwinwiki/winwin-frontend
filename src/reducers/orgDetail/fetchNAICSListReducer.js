import {
  FETCH_NAICS_LIST_REQUEST,
  FETCH_NAICS_LIST_SUCCESS,
  FETCH_NAICS_LIST_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NAICS_LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_NAICS_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response.response,
        error: false
      });
    case FETCH_NAICS_LIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
