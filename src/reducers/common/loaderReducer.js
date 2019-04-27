import {
  LOADER_START,
  LOADER_STOP,
  LOGIN_ERROR,
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR,
  LOGIN_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADER_START:
      return Object.assign({}, state, {
        loading: true,
        message: action.data
      });
    case LOADER_STOP:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case USERINFO_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case USERINFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case USERINFO_ERROR:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
};
