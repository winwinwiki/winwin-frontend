import { SET_FETCHORG_PENDING, SET_FETCHORG_SUCCESS, SET_FECTHORG_ERROR } from '../../constants/dispatch';
import { callFetchOrgApi } from '../../api/orgLanding/orgLandingApi';

export const fetchOrganisationsList = () => {
    return dispatch => {
        dispatch(setFetchOrgPending(true));
        dispatch(setFetchOrgSuccess(false));
        dispatch(setFetchOrgError(null));

        callFetchOrgApi((error, orgList) => {
            dispatch(setFetchOrgPending(false));
            if (!error) {
                dispatch(setFetchOrgSuccess(true, orgList));
            } else {
                dispatch(setFetchOrgError(error));
            }
        });
    }
}

function setFetchOrgPending(isFetchOrgPending) {
    return {
        type: SET_FETCHORG_PENDING,
        isFetchOrgPending
    };
}

function setFetchOrgSuccess(isFetchOrgSuccess, orgList) {
    return {
        type: SET_FETCHORG_SUCCESS,
        isFetchOrgSuccess,
        orgList
    };
}

function setFetchOrgError(fetchOrgError) {
    return {
        type: SET_FECTHORG_ERROR,
        fetchOrgError
    }
}