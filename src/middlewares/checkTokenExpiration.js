import jwtDecode from "jwt-decode";
import { logout } from "../actions/auth/loginAction";

export const checkTokenExpiration = store => dispatch => action => {
  const token =
    JSON.parse(localStorage.getItem("_auth")) &&
    JSON.parse(localStorage.getItem("_auth"))["accessToken"];
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    dispatch(logout());
    localStorage.clear();
  }
  dispatch(action);
};
