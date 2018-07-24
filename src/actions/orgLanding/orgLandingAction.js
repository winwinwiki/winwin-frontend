import { SET_FETCHORG_PENDING, SET_FETCHORG_SUCCESS, SET_FECTHORG_ERROR, FILTER_ORG_LIST,
    SET_APPLIED_FILTER_FLAG } from '../../constants/dispatch';
import { callFetchOrgApi } from '../../api/orgLanding/orgLandingApi';

export const fetchOrganisationsList = () => {
    return dispatch => {
        dispatch(setFetchOrgPending(true));
        dispatch(setFetchOrgSuccess(false, []));
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

export const filterOrganisationsList = (newList) => {
    return dispatch => {
        dispatch(updateOrganisationsList(newList));
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

function updateOrganisationsList(filteredOrgList) {
    return {
        type: FILTER_ORG_LIST,
        filteredOrgList
    }
}
