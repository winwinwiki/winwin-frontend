import {
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERINFO_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case USERINFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response.response,
        error: false
      });

    // case SAVEUSERINFO_SUCCESS:
    //   // localStorage.setItem("user", JSON.stringify(action.response));
    //   const { response = {} } = action;
    //   return Object.assign({}, state, {
    //     user: response.response,
    //     isAuthenticated: true
    //   });

    case USERINFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};
