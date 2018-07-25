import { FETCH_REGIONSERVED_PENDING, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR } from '../../constants/dispatch';
import { callRegionsServedApi } from '../../api/orgDetail/regionsServedApi';

export const setOrgRegionsServed = (regions) => {
    return dispatch => {
        dispatch(setRegionsServedPending(true));
        dispatch(setRegionsServedSuccess(false, []));
        dispatch(setRegionsServedError(null));

        callRegionsServedApi(regions, (error, regionsServedList) => {
            dispatch(setRegionsServedPending(false));
            if (!error) {
                dispatch(setRegionsServedSuccess(true, regionsServedList));
            } else {
                dispatch(setRegionsServedError(error));
            }
        });
    }
}

function setRegionsServedPending(isRegionsServedPending) {
    return {
        type: FETCH_REGIONSERVED_PENDING,
        isRegionsServedPending
    }
}

function setRegionsServedSuccess(isRegionsServedSuccess, regionsServedList) {
    return {
        type: FETCH_REGIONSERVED_SUCCESS,
        isRegionsServedSuccess,
        regionsServedList
    }
}

function setRegionsServedError(isRegionsServedError) {
    return {
        type: FETCH_REGIONSERVED_ERROR,
        isRegionsServedError
    }
}