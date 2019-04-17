import {
  LOADER_START,
  LOADER_STOP,
  LOGIN_ERROR
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
    default:
      return state;
  }
};
