import { LOADER_START, LOADER_STOP } from "../../constants/dispatch";

export function startLoader(message) {
  return {
    type: LOADER_START,
    data: message
  };
}

export function stopLoader() {
  return {
    type: LOADER_STOP,
    data: null
  };
}

export function startLoaderAction(message) {
  return function(dispatch, getState) {
    return dispatch(startLoader(message));
  };
}

export function stopLoaderAction() {
  return function(dispatch, getState) {
    return dispatch(stopLoader());
  };
}
