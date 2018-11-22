import {
    FETCHORG_REQUEST, FETCHORG_SUCCESS, FECTHORG_ERROR,
    SET_SDGLIST,
    SET_SPILIST,
    SET_APPLIED_FILTER
} from '../../constants/dispatch';
import { callFetchOrgApi, callFetchSdgListApi, callFetchSpiListApi } from '../../api/orgLanding/orgLandingApi';

export const fetchOrganisationsList = (params) => {
    return dispatch => {
        dispatch(fetchOrgRequest());
        callFetchSdgListApi((error, sdgList) => {
            if (!error) {
                dispatch(setSdgList(sdgList));
                callFetchSpiListApi((error, spiList) => {
                    if (!error) {
                        dispatch(setSpiList(spiList));
                        callFetchOrgApi(params, (error, orgList) => {
                            if (!error) {
                                dispatch(fetchOrgSuccess(orgList));
                            } else {
                                dispatch(fetchOrgError(error));
                            }
                        });
                    } else {
                        dispatch(fetchOrgError(error));
                    }
                });
            } else {
                dispatch(fetchOrgError(error));
            }
        });
    }
}

export const setAppliedFilters = (appliedFilterList, params) => {
    return dispatch => {
        dispatch(setAppliedFiltersList(appliedFilterList));
        dispatch(fetchOrgRequest());
        callFetchOrgApi(params, (error, orgList) => {
            if (!error) {
                dispatch(fetchOrgSuccess(orgList));
            } else {
                dispatch(fetchOrgError(error));
            }
        });

    }
}

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
    }
}

function setSdgList(sdgList) {
    return {
        type: SET_SDGLIST,
        sdgList
    }
}

function setSpiList(spiList) {
    return {
        type: SET_SPILIST,
        spiList
    }
}

function setAppliedFiltersList(appliedFilterList) {
    return {
        type: SET_APPLIED_FILTER,
        appliedFilterList
    }
}
