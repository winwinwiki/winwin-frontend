import {
  CREATE_BULK_ORG_REQUEST,
  CREATE_BULK_ORG_SUCCESS,
  CREATE_BULK_ORG_ERROR
} from "../../constants/dispatch";
const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BULK_ORG_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case CREATE_BULK_ORG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case CREATE_BULK_ORG_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
