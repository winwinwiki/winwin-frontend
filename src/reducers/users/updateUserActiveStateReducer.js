import {
  UPDATE_USER_ACTIVE_STATE_REQUEST,
  UPDATE_USER_ACTIVE_STATE_ERROR,
  UPDATE_USER_ACTIVE_STATE_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ACTIVE_STATE_REQUEST:
      console.log('save user info reducer UPDATE_USER_ACTIVE_STATE_REQUEST');
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case UPDATE_USER_ACTIVE_STATE_SUCCESS:
      console.log('save user info reducer UPDATE_USER_ACTIVE_STATE_SUCCESS', action.response);
      return Object.assign({}, state, {
        data: action.response,
        loading: false,
        error: false
      });

    case UPDATE_USER_ACTIVE_STATE_ERROR:
      console.log('save user info reducer UPDATE_USER_ACTIVE_STATE_ERROR', action.error);
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    default:
      return state;
  }
};
