import { SET_FETCHORGHISTORY_PENDING, SET_FETCHORGHISTORY_SUCCESS, SET_FECTHORGHISTORY_ERROR } from '../../constants/dispatch';
import { callFetchOrgHistoryApi } from '../../api/orgDetail/orgHistoryApi';

export const fetchOrgHistory = (orgId, callback) => {
    return dispatch => {

        dispatch(setFetchOrgHistoryPending(true));
        dispatch(setFetchOrgHistorySuccess(false, {}));
        dispatch(setFetchOrgHistoryError(null));

        callFetchOrgHistoryApi(orgId, (error, orgHistory) => {
            dispatch(setFetchOrgHistoryPending(false));
            if (!error) {
                dispatch(setFetchOrgHistorySuccess(true, orgHistory));
                callback();
            } else {
                dispatch(setFetchOrgHistoryError(error));
            }
        });
    }
}

function setFetchOrgHistoryPending(isFetchOrgHistoryPending) {
    return {
        type: SET_FETCHORGHISTORY_PENDING,
        isFetchOrgHistoryPending
    };
}

function setFetchOrgHistorySuccess(isFetchOrgHistorySuccess, orgHistory) {
    return {
        type: SET_FETCHORGHISTORY_SUCCESS,
        isFetchOrgHistorySuccess,
        orgHistory
    };
}

function setFetchOrgHistoryError(fetchOrgHistoryError) {
    return {
        type: SET_FECTHORGHISTORY_ERROR,
        fetchOrgHistoryError
    }
}
