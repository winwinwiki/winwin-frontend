import {
  ADD_ORG_CHART_CHILD_REQUEST,
  ADD_ORG_CHART_CHILD_SUCCESS,
  ADD_ORG_CHART_CHILD_ERROR
} from "../../constants/dispatch";
import { api } from "../../api/api";

export const onAddOrgChartChild = params => {
  return dispatch => {
    dispatch(addOrgChartChildReq());
    api(
      `/organization/${params.parentId}/suborganization`,
      "POST",
      JSON.stringify(params),
      true
    ).then(
      response => {
        dispatch(addOrgChartChildSuccess(response));
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

function addOrgChartChildSuccess(response) {
  return {
    type: ADD_ORG_CHART_CHILD_SUCCESS,
    response
  };
}

function addOrgChartChildError(error) {
  return {
    type: ADD_ORG_CHART_CHILD_ERROR,
    error
  };
}
