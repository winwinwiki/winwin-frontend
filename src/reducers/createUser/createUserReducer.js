import {
  CREATEUSER_REQUEST,
  CREATEUSER_SUCCESS,
  CREATEUSER_ERROR,
  CREATE_KIBANA_USER_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  isKibanaUserAdded: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATEUSER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case CREATEUSER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case CREATE_KIBANA_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isKibanaUserAdded: action.response,
        error: false
      });

    case CREATEUSER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
