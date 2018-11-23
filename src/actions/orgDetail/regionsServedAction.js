import { FETCH_REGIONSERVED_REQUEST, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR,
    SAVE_REGIONSERVED_REQUEST, SAVE_REGIONSERVED_SUCCESS, SAVE_REGIONSERVED_ERROR  } from '../../constants/dispatch';
import { setRegionsServedApi, fetchRegionsServedApi } from '../../api/orgDetail/regionsServedApi';

export const saveOrgRegionsServed = (regions) => {
    return dispatch => {
        dispatch(saveRegionsServedReq());
        setRegionsServedApi(regions, (error, response) => {
            if (!error) {
                dispatch(saveRegionsServedSuccess(response));
            } else {
                dispatch(saveRegionsServedError(error));
            }
        });
    }
}


export const fetchOrgRegionsServed = () => {
    return dispatch => {
        dispatch(fetchRegionsServedReq());
        fetchRegionsServedApi((error, response) => {
            if (!error) {
                dispatch(fetchRegionsServedSuccess(response));
            } else {
                dispatch(fetchRegionsServedError(error));
            }
        });
    }
}

function fetchRegionsServedReq() {
    return {
        type: FETCH_REGIONSERVED_REQUEST
    }
}

function fetchRegionsServedSuccess(response) {
    return {
        type: FETCH_REGIONSERVED_SUCCESS,
        response
    }
}

function fetchRegionsServedError(error) {
    return {
        type: FETCH_REGIONSERVED_ERROR,
        error
    }
}

function saveRegionsServedReq() {
    return {
        type: SAVE_REGIONSERVED_REQUEST
    }
}

function saveRegionsServedSuccess(response) {
    return {
        type: SAVE_REGIONSERVED_SUCCESS,
        response
    }
}

function saveRegionsServedError(error) {
    return {
        type: SAVE_REGIONSERVED_ERROR,
        error
    }
}