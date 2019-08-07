import jwtDecode from "jwt-decode";
import {
  DONE_REFRESHING_TOKEN,
  REFRESHING_TOKEN,
  SET_REFRESH_TOKEN_SUCCESS
} from "../constants/dispatch";
import CommonUtil from "../api/commonUtil";

export function checkTokenExpiration({ dispatch, getState }) {
  return next => action => {
    // only worry about expiring token for async actions
    if (typeof action === "function") {
      if (getState().session.data && getState().session.data.accessToken) {
        // decode jwt so that we know if and when it expires
        var accessToken = getState().session.data.accessToken;

        if (accessToken && jwtDecode(accessToken).exp < Date.now() / 1000) {
          // make sure we are not already refreshing the token
          if (!getState().session.data.freshTokenPromise) {
            return refreshToken(dispatch).then(() => next(action));
          } else {
            return getState().session.data.freshTokenPromise.then(() =>
              next(action)
            );
          }
        }
      }
    }
    return next(action);
  };
}

export function refreshToken(dispatch) {
  var freshTokenPromise = fetch(CommonUtil.createUrl("/user/login"), {
    method: "POST",
    headers: CommonUtil.getHeaders(),
    body: JSON.stringify({
      userName: JSON.parse(localStorage.getItem("user"))["email"],
      refreshToken: JSON.parse(localStorage.getItem("refreshToken"))
    })
  })
    .then(res => res.json())
    .then(t => {
      dispatch({
        type: DONE_REFRESHING_TOKEN
      });

      dispatch(saveToken(t.response.authResult.accessToken));

      return t.response.authResult.accessToken
        ? Promise.resolve(t.response.authResult.accessToken)
        : Promise.reject({
            message: "could not refresh token"
          });
    })
    .catch(e => {
      console.log("error refreshing token", e);

      dispatch({
        type: DONE_REFRESHING_TOKEN
      });
      return Promise.reject(e);
    });

  dispatch({
    type: REFRESHING_TOKEN,

    // we want to keep track of token promise in the state so that we don't try to refresh
    // the token again while refreshing is in process
    freshTokenPromise
  });

  return freshTokenPromise;
}

//action creater
export function saveToken(response) {
  return {
    type: SET_REFRESH_TOKEN_SUCCESS,
    response
  };
}
