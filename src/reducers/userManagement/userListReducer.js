import {
  SET_FETCHUSER_PENDING,
  SET_FETCHUSER_SUCCESS,
  SET_FETCHUSER_ERROR,
  DELETE_USER_SUCCESS,
  CREATEUSER_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHUSER_PENDING:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case SET_FETCHUSER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response.response,
        error: false
      });

    case CREATEUSER_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.response]
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(x => x.email !== action.response.email)
      };

    case SET_FETCHUSER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
