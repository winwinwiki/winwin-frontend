import { SET_FETCHORGDETAIL_PENDING, SET_FETCHORGDETAIL_SUCCESS, SET_FECTHORGDETAIL_ERROR, SET_FETCHPROGDETAIL_PENDING, SET_FETCHPROGDETAIL_SUCCESS, SET_FECTHPROGDETAIL_ERROR } from '../../constants/dispatch';
import { callFetchOrgDetailApi } from '../../api/orgDetail/orgDetailApi';

export const fetchOrganisationDetail = (orgId, programId, callback) => {
    return dispatch => {
        if (programId) {
            dispatch(setFetchProgDetailPending(true));
            dispatch(setFetchProgDetailSuccess(false, {}));
            dispatch(setFetchProgDetailError(null));
        } else {
            dispatch(setFetchOrgDetailPending(true));
            dispatch(setFetchOrgDetailSuccess(false, {}));
            dispatch(setFetchOrgDetailError(null));
        }

        callFetchOrgDetailApi(orgId, programId, (error, orgDetail) => {
            programId ? dispatch(setFetchProgDetailPending(false)) : dispatch(setFetchOrgDetailPending(false));
            if (!error) {
                programId
                    ? dispatch(setFetchProgDetailSuccess(true, orgDetail))
                    : dispatch(setFetchOrgDetailSuccess(true, orgDetail));
                callback();
            } else {
                programId ? dispatch(setFetchProgDetailError(error)) : dispatch(setFetchOrgDetailError(error));
            }
        });
    }
}

//Org Detail
function setFetchOrgDetailPending(isFetchOrgDetailPending) {
    return {
        type: SET_FETCHORGDETAIL_PENDING,
        isFetchOrgDetailPending
    };
}

function setFetchOrgDetailSuccess(isFetchOrgDetailSuccess, orgDetail) {
    return {
        type: SET_FETCHORGDETAIL_SUCCESS,
        isFetchOrgDetailSuccess,
        orgDetail
    };
}

function setFetchOrgDetailError(fetchOrgDetailError) {
    return {
        type: SET_FECTHORGDETAIL_ERROR,
        fetchOrgDetailError
    }
}

//Prog Detail
function setFetchProgDetailPending(isFetchProgDetailSuccess) {
    return {
        type: SET_FETCHPROGDETAIL_PENDING,
        isFetchProgDetailSuccess
    };
}

function setFetchProgDetailSuccess(isFetchProgDetailSuccess, progDetail) {
    return {
        type: SET_FETCHPROGDETAIL_SUCCESS,
        isFetchProgDetailSuccess,
        progDetail
    };
}

function setFetchProgDetailError(fetchProgDetailError) {
    return {
        type: SET_FECTHPROGDETAIL_ERROR,
        fetchProgDetailError
    }
}
