import { FETCH_ORGDETAIL_REQUEST, FETCH_ORGDETAIL_SUCCESS, FETCH_ORGDETAIL_ERROR, 
    FETCH_PROGDETAIL_REQUEST, FETCH_PROGDETAIL_SUCCESS, FECTH_PROGDETAIL_ERROR } from '../../constants/dispatch';
import { callFetchOrgDetailApi } from '../../api/orgDetail/orgDetailApi';

export const fetchOrganisationDetail = (orgId, programId) => {
    return dispatch => {
        if (programId) {
            dispatch(fetchProgDetailReq(true));
        } else {
            dispatch(fetchOrgDetailReq());
        }
        callFetchOrgDetailApi(orgId, programId, (error, response) => {
            if (!error) {
                programId
                    ? dispatch(fetchProgDetailSuccess(response))
                    : dispatch(fetchOrgDetailSuccess(response));
            } else {
                programId ? dispatch(fetchProgDetailError(error)) : dispatch(fetchOrgDetailError(error));
            }
        });
    }
}

//Org Detail
function fetchOrgDetailReq() {
    return {
        type: FETCH_ORGDETAIL_REQUEST
    };
}

function fetchOrgDetailSuccess(response) {
    return {
        type: FETCH_ORGDETAIL_SUCCESS,
        response
    };
}

function fetchOrgDetailError(error) {
    return {
        type: FETCH_ORGDETAIL_ERROR,
        error
    }
}

//Prog Detail
function fetchProgDetailReq() {
    return {
        type: FETCH_PROGDETAIL_REQUEST
    };
}

function fetchProgDetailSuccess(response) {
    return {
        type: FETCH_PROGDETAIL_SUCCESS,
        response
    };
}

function fetchProgDetailError(error) {
    return {
        type: FECTH_PROGDETAIL_ERROR,
        error
    }
}
