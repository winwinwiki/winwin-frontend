import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_USER_FROM_STORAGE,
  LOGOUT,
  LOGGED_IN_USERINFO_SUCCESS,
  SET_REFRESH_TOKEN_SUCCESS,
  REFRESHING_TOKEN
} from "../../constants/dispatch";
import { addToLocalStorageObject } from "../../util/util";
import AuthUser from "./userProfile";

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

    case SET_REFRESH_TOKEN_SUCCESS:
      addToLocalStorageObject("_auth", "accessToken", action.response);
      return {
        ...state,
        data: {
          ...state.data,
          accessToken: action.response
        }
      };

    case REFRESHING_TOKEN:
      return {
        ...state,
        data: {
          ...state.data,
          freshTokenPromise: action.freshTokenPromise
        }
      };

    case LOGIN_SUCCESS:
      action.response.response &&
        action.response.response.authResult &&
        localStorage.setItem(
          "_auth",
          JSON.stringify(action.response.response.authResult)
        );
      action.response.response.userDetails &&
        localStorage.setItem(
          "user",
          JSON.stringify(action.response.response.userDetails)
        );
      //refresh token

      if (
        action.response.response.authResult &&
        action.response.response.authResult.refreshToken
      )
        AuthUser.setToken(action.response.response.authResult.refreshToken);

      return Object.assign({}, state, {
        loading: false,
        data: action.response.response.authResult
          ? action.response.response.authResult
          : action.response.response,
        user: action.response.response.userDetails
          ? action.response.response.userDetails
          : "",
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
    case LOGGED_IN_USERINFO_SUCCESS:
      action.response.response &&
        localStorage.setItem("user", JSON.stringify(action.response.response));
      return Object.assign({}, state, {
        user: action.response.response,
        isAuthenticated: true
      });

    case LOAD_USER_FROM_STORAGE: {
      const user = action.data.user;
      const isAuthenticated = user && user.email ? true : false;
      return {
        ...state,
        data: state.data
          ? state.data
          : JSON.parse(localStorage.getItem("_auth")),
        isAuthenticated,
        user
      };
    }

    case LOGOUT: {
      localStorage.clear();
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
