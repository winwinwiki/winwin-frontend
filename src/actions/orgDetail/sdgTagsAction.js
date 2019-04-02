import {
  FETCH_SDGTAGS_REQUEST,
  FETCH_SDGTAGS_SUCCESS,
  FETCH_SDGTAGS_ERROR,
  UPDATE_SDGDATA_REQUEST,
  UPDATE_SDGDATA_SUCCESS,
  UPDATE_SDGDATA_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const fetchSdgTags = orgId => {
  return dispatch => {
    dispatch(sdgTagsRequest());
    api(`/organization/${orgId}/sdgdata/selected`, "GET", {}, true).then(
      response => {
        response.response.map(x => (x.isChecked = true));
        dispatch(sdgTagsSuccess(response));
      },
      error => {
        dispatch(sdgTagsError(error));
      }
    );
  };
};

export const updateSDGData = (apiObj, orgId, filteredObj) => {
  return dispatch => {
    dispatch(updateSDGDataReq());
    api(
      `/organization/${orgId}/sdgdata`,
      "POST",
      JSON.stringify(apiObj),
      true
    ).then(
      response => {
        dispatch(updateSDGDataSuccess(response, filteredObj));
      },
      error => {
        dispatch(updateSDGDataError(error));
      }
    );
  };
};

function sdgTagsRequest() {
  return {
    type: FETCH_SDGTAGS_REQUEST
  };
}

function sdgTagsSuccess(response) {
  return {
    type: FETCH_SDGTAGS_SUCCESS,
    response
  };
}

function sdgTagsError(error) {
  return {
    type: FETCH_SDGTAGS_ERROR,
    error
  };
}

function updateSDGDataReq() {
  return {
    type: UPDATE_SDGDATA_REQUEST
  };
}

function updateSDGDataSuccess(response, filteredObj) {
  return {
    type: UPDATE_SDGDATA_SUCCESS,
    filteredObj
  };
}

function updateSDGDataError(error) {
  return {
    type: UPDATE_SDGDATA_ERROR,
    error
  };
}
