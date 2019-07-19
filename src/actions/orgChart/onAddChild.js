import {
  ADD_ORG_CHART_CHILD_REQUEST,
  ADD_ORG_CHART_CHILD_SUCCESS,
  ADD_ORG_CHART_CHILD_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";
import { startLoader, stopLoader } from "../common/loaderActions";

export const onAddOrgChartChild = params => {
  return dispatch => {
    dispatch(addOrgChartChildReq());
    dispatch(startLoader());
    api(
      `/organization/${params.parentId}/suborganization`,
      "POST",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(addOrgChartChildSuccess(response, params.parentId));
        dispatch(stopLoader());
      },
      error => {
        dispatch(addOrgChartChildError(error));
      }
    );
  };
};

function addOrgChartChildReq() {
  return {
    type: ADD_ORG_CHART_CHILD_REQUEST
  };
}

function addOrgChartChildSuccess(response, parentId) {
  return {
    type: ADD_ORG_CHART_CHILD_SUCCESS,
    response,
    parentId
  };
}

function addOrgChartChildError(error) {
  return {
    type: ADD_ORG_CHART_CHILD_ERROR,
    error
  };
}
