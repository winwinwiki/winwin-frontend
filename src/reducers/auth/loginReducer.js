import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_FROM_STORAGE,
  USERINFO_SUCCESS,
  LOGOUT,
  SAVEUSERINFO_SUCCESS
} from "../../constants/dispatch";
import { updateObject } from "../../util/util";

const initialState = {
  loading: false,
  data: null,
  error: false,
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
  isAuthenticated: localStorage._auth
    ? !!JSON.parse(localStorage._auth).accessToken
    : false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false,
        isAuthenticated: false
      });

    case LOGIN_SUCCESS:
      localStorage.setItem("_auth", JSON.stringify(action.response.response));
      return Object.assign({}, state, {
        loading: false,
        data: action.response.response,
        error: false,
        isNewUser: action.response.response.isNewUser
          ? action.response.response.isNewUser
          : "",
        isAuthenticated: true //access token is manadatory to login
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true,
        isAuthenticated: false
      });
    case USERINFO_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.response.response));
      return Object.assign({}, state, {
        user: action.response.response,
        isAuthenticated: true
      });

    case SAVEUSERINFO_SUCCESS:
      // localStorage.setItem("user", JSON.stringify(action.response));
      const { response = {} } = action;
      return Object.assign({}, state, {
        user: response.response,
        isAuthenticated: true
      });

    case LOAD_USER_FROM_STORAGE: {
      const user = action.data.user;
      const isAuthenticated = user && user.email ? true : false;
      return Object.assign({}, state, {
        isAuthenticated,
        user
      });
    }

    case LOGOUT: {
      localStorage.removeItem("user");
      localStorage.removeItem("_auth");
      return Object.assign({}, state, {
        loading: false,
        data: null,
        error: false,
        user: null,
        isAuthenticated: false
      });
    }

    default:
      return state;
  }
};
