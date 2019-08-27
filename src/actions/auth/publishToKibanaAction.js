import {
  PUBLISH_TO_KIBANA_REQUEST,
  PUBLISH_TO_KIBANA_SUCCESS,
  PUBLISH_TO_KIBANA_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const publishToKibanaAction = () => {
  return dispatch => {
    dispatch(publishToKibanaRequest());
    api("/winwin/es", "GET", {}, true).then(
      response => {
        dispatch(publishToKibanaSuccess(response));
      },
      error => {
        dispatch(publishToKibanaError(error));
      }
    );
  };
};

function publishToKibanaRequest() {
  return {
    type: PUBLISH_TO_KIBANA_REQUEST
  };
}

function publishToKibanaSuccess(response) {
  return {
    type: PUBLISH_TO_KIBANA_SUCCESS,
    response
  };
}

function publishToKibanaError(error) {
  return {
    type: PUBLISH_TO_KIBANA_ERROR,
    error
  };
}
