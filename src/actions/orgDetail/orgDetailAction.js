import { SET_FETCHORGDETAIL_PENDING, SET_FETCHORGDETAIL_SUCCESS, SET_FECTHORGDETAIL_ERROR} from '../../constants/dispatch';
import { callFetchOrgDetailApi } from '../../api/orgDetail/orgDetailApi';

export const fetchOrganisationDetail = (orgId, callback) => {
    return dispatch => {
        dispatch(setFetchOrgDetailPending(true));
        dispatch(setFetchOrgDetailSuccess(false, {}));
        dispatch(setFetchOrgDetailError(null));

        callFetchOrgDetailApi(orgId, (error, orgDetail) => {
            dispatch(setFetchOrgDetailPending(false));
            if (!error) {
                dispatch(setFetchOrgDetailSuccess(true, orgDetail));
                callback();
            } else {
                dispatch(setFetchOrgDetailError(error));
            }
        });
    }
}

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
