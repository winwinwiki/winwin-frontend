import {
  SAVEUSERINFO_REQUEST,
  SAVEUSERINFO_SUCCESS,
  SAVEUSERINFO_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVEUSERINFO_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case SAVEUSERINFO_SUCCESS:
      return Object.assign({}, state, {
        data: action.response,
        loading: false,
        error: false
      });

    case SAVEUSERINFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
