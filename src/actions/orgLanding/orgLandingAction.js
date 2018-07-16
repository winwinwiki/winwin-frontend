export const fetchOrganisationsList = (org, cb) => {
    return dispatch => {
        dispatch(setFetchOrgPending(true));
        dispatch(setFetchOrgSuccess(false));
        dispatch(setFetchOrgError(null));

        callCreateOrgApi(org, (error, res) => {
            dispatch(setFetchOrgPending(false));
            if (!error) {
                dispatch(setFetchOrgSuccess(true));
                cb();
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

function setFetchOrgSuccess(isFetchOrgSuccess) {
    return {
        type: SET_FETCHORG_SUCCESS,
        isFetchOrgSuccess
    };
}

function setFetchOrgError(fetchOrgError) {
    return {
        type: SET_FECTHORG_ERROR,
        fetchOrgError
    }
}