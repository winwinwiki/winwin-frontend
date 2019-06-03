import {
  FETCHORG_REQUEST,
  FETCHORG_SUCCESS,
  FECTHORG_ERROR,
  SET_SDGLIST_REQUEST,
  SET_SDGLIST_SUCCESS,
  SET_SDGLIST_ERROR,
  SET_SPILIST_REQUEST,
  SET_SPILIST_SUCCESS,
  SET_SPILIST_ERROR,
  SET_APPLIED_FILTER
} from "../../constants/dispatch";
import { api } from "../../api/api";
import qs from "qs";
import { PROGRAM } from "../../constants";

export const fetchOrganisationsList = params => {
  return dispatch => {
    dispatch(fetchOrgRequest());
    let queryString = qs.stringify(params);
    api(
      `/organization${queryString ? "?" + queryString : ""}`,
      "GET",
      {},
      true
    ).then(
      response => {
        dispatch(fetchOrgSuccess(response));
      },
      error => {
        dispatch(fetchOrgError(error));
      }
    );
  };
};

export const setAppliedFilters = (appliedFilterList, params) => {
  return dispatch => {
    dispatch(setAppliedFiltersList(appliedFilterList));
    dispatch(fetchOrgRequest());
    let queryString = qs.stringify(params);
    api(
      `/organization${queryString ? "?" + queryString : ""}`,
      "GET",
      {},
      true
    ).then(
      response => {
        dispatch(fetchOrgSuccess(response));
      },
      error => {
        dispatch(fetchOrgError(error));
      }
    );
  };
};

export const fetchSdgTagsList = (orgId, type) => {
  return dispatch => {
    dispatch(setSdgListReq());
    let url =
      type === PROGRAM
        ? `/program/${orgId}/sdgdata`
        : `/organization/${orgId}/sdgdata`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(setSdgListSuccess(response));
      },
      error => {
        dispatch(setSdgListError(error));
      }
    );
  };
};

export const fetchSpiTagsList = (organizationId, type) => {
  return dispatch => {
    dispatch(setSpiListReq());
    let url =
      type === PROGRAM
        ? `/program/${organizationId}/spidata`
        : `/organization/${organizationId}/spidata`;
    api(url, "GET", {}, true).then(
      response => {
        dispatch(setSpiListSuccess(response));
      },
      error => {
        dispatch(setSpiListError(error));
      }
    );
  };
};

function fetchOrgRequest() {
  return {
    type: FETCHORG_REQUEST
  };
}

function fetchOrgSuccess(response) {
  return {
    type: FETCHORG_SUCCESS,
    response
  };
}

function fetchOrgError(error) {
  return {
    type: FECTHORG_ERROR,
    error
  };
}

function setSdgListReq() {
  return {
    type: SET_SDGLIST_REQUEST
  };
}
function setSdgListSuccess(response) {
  return {
    type: SET_SDGLIST_SUCCESS,
    response
  };
}
function setSdgListError(error) {
  return {
    type: SET_SDGLIST_ERROR,
    error
  };
}

function setSpiListReq() {
  return {
    type: SET_SPILIST_REQUEST
  };
}
function setSpiListSuccess(response) {
  return {
    type: SET_SPILIST_SUCCESS,
    response
  };
}
function setSpiListError(error) {
  return {
    type: SET_SPILIST_ERROR,
    error
  };
}

function setAppliedFiltersList(appliedFilterList) {
  return {
    type: SET_APPLIED_FILTER,
    appliedFilterList
  };
}
