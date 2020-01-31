import {
  DELETEORG_REQUEST,
  DELETEORG_SUCCESS,
  DELETEORG_ERROR,
  DELETEORGCHART_REQUEST,
  DELETEORGCHART_SUCCESS,
  DELETEORGCHART_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onDeleteOrg = params => {
  return dispatch => {
    dispatch(deleteOrgRequest());
    const deleteObj = {
      id: params
    };
    api("/organization", "DELETE", JSON.stringify(deleteObj), true).then(
      response => {
        dispatch(deleteOrgSuccess(deleteObj.id));
      },
      error => {
        dispatch(deleteOrgError(error));
      }
    );
  };
};

export const onDeleteOrgChart = params => {
  return dispatch => {
    dispatch(deleteOrgChartRequest());
    const deleteObj = {
      id: params
    };
    api("/organization", "DELETE", JSON.stringify(deleteObj), true).then(
      response => {
        dispatch(deleteOrgChartSuccess(deleteObj.id));
      },
      error => {
        dispatch(deleteOrgChartError(error));
      }
    );
  };
};

function deleteOrgRequest() {
  return {
    type: DELETEORG_REQUEST
  };
}

function deleteOrgSuccess(response) {
  return {
    type: DELETEORG_SUCCESS,
    response
  };
}

function deleteOrgError(error) {
  return {
    type: DELETEORG_ERROR,
    error
  };
}

function deleteOrgChartRequest() {
  return {
    type: DELETEORGCHART_REQUEST
  };
}

function deleteOrgChartSuccess(response) {
  return {
    type: DELETEORGCHART_SUCCESS,
    response
  };
}

function deleteOrgChartError(error) {
  return {
    type: DELETEORGCHART_ERROR,
    error
  };
}
