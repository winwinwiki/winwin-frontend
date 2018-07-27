import { FETCH_REGIONSERVED_PENDING, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR,
    SET_REGIONSERVED_PENDING, SET_REGIONSERVED_SUCCESS, SET_REGIONSERVED_ERROR  } from '../../constants/dispatch';
import { setRegionsServedApi, fetchRegionsServedApi } from '../../api/orgDetail/regionsServedApi';

export const setOrgRegionsServed = (regions) => {
    return dispatch => {
        dispatch(setRegionsServedPending(true));
        dispatch(setRegionsServedSuccess(false, []));
        dispatch(setRegionsServedError(null));

        setRegionsServedApi(regions, (error, regionsServedList) => {
            dispatch(setRegionsServedPending(false));
            if (!error) {
                dispatch(setRegionsServedSuccess(true, regionsServedList));
            } else {
                dispatch(setRegionsServedError(error));
            }
        });
    }
}


export const fetchOrgRegionsServed = () => {
    return dispatch => {
        dispatch(fetchRegionsServedPending(true));
        dispatch(fetchRegionsServedSuccess(false, []));
        dispatch(fetchRegionsServedError(null));

        fetchRegionsServedApi((error, regionsServedList) => {
            dispatch(fetchRegionsServedPending(false));
            if (!error) {
                dispatch(fetchRegionsServedSuccess(true, regionsServedList));
            } else {
                dispatch(fetchRegionsServedError(error));
            }
        });
    }
}

function fetchRegionsServedPending(isRegionsServedPending) {
    return {
        type: FETCH_REGIONSERVED_PENDING,
        isRegionsServedPending
    }
}

function fetchRegionsServedSuccess(isRegionsServedSuccess, regionsServedList) {
    return {
        type: FETCH_REGIONSERVED_SUCCESS,
        isRegionsServedSuccess,
        regionsServedList
    }
}

function fetchRegionsServedError(isRegionsServedError) {
    return {
        type: FETCH_REGIONSERVED_ERROR,
        isRegionsServedError
    }
}

function setRegionsServedPending(isRegionsServedPending) {
    return {
        type: SET_REGIONSERVED_PENDING,
        isRegionsServedPending
    }
}

function setRegionsServedSuccess(isRegionsServedSuccess, regionsServedList) {
    return {
        type: SET_REGIONSERVED_SUCCESS,
        isRegionsServedSuccess,
        regionsServedList
    }
}

function setRegionsServedError(isRegionsServedError) {
    return {
        type: SET_REGIONSERVED_ERROR,
        isRegionsServedError
    }
}