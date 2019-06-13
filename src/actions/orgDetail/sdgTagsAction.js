import {
  FETCH_SDGTAGS_REQUEST,
  FETCH_SDGTAGS_SUCCESS,
  FETCH_SDGTAGS_ERROR,
  UPDATE_SDGDATA_REQUEST,
  UPDATE_SDGDATA_SUCCESS,
  UPDATE_SDGDATA_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { PROGRAM } from "../../constants";

export const fetchSdgTags = (orgId, type) => {
  return dispatch => {
    dispatch(sdgTagsRequest());
    let url =
      type === PROGRAM
        ? `/program/${orgId}/sdgdata/selected`
        : `/organization/${orgId}/sdgdata/selected`;
    api(url, "GET", {}, true).then(
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

export const updateSDGData = (apiObj, orgId, filteredObj, type, programId) => {
  return dispatch => {
    dispatch(updateSDGDataReq());
    let url =
      type === PROGRAM
        ? `/program/${programId}/sdgdata`
        : `/organization/${orgId}/sdgdata`;
    api(url, "PUT", JSON.stringify(apiObj), true).then(
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
