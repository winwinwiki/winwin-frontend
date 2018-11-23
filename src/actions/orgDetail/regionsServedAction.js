import {
    FETCH_REGIONSERVED_REQUEST, FETCH_REGIONSERVED_SUCCESS, FETCH_REGIONSERVED_ERROR,
    SAVE_REGIONSERVED_REQUEST, SAVE_REGIONSERVED_SUCCESS, SAVE_REGIONSERVED_ERROR
} from '../../constants/dispatch';
import { api } from '../../api/api';

export const saveOrgRegionsServed = (params) => {
    return dispatch => {
        dispatch(saveRegionsServedReq());
        api("/regions-served", "POST", params, true).then((response) => {
            dispatch(saveRegionsServedSuccess(response));
        }, (error) => {
            dispatch(saveRegionsServedError(error));
        });
    }
}


export const fetchOrgRegionsServed = () => {
    return dispatch => {
        dispatch(fetchRegionsServedReq());
        api("/regions-served", "GET", {}, true).then((response) => {
            dispatch(fetchRegionsServedSuccess(response));
        }, (error) => {
            dispatch(fetchRegionsServedError(error));
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