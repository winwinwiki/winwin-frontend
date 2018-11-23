import {
    FETCH_RESOURCES_REQUEST, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR,
    SAVE_RESOURCES_REQUEST, SAVE_RESOURCES_SUCCESS, SAVE_RESOURCES_ERROR
} from '../../constants/dispatch';
import { api } from '../../api/api';

export const saveOrgResources = (params) => {
    return dispatch => {
        dispatch(saveResourcesReq());
        api("/resources", "POST", params, true).then((response) => {
            dispatch(saveResourcesSuccess(response));
        }, (error) => {
            dispatch(saveResourcesError(error));
        });
    }
}


export const fetchOrgResources = () => {
    return dispatch => {
        dispatch(fetchResourcesReq());
        api("/resources", "GET", {}, true).then((response) => {
            dispatch(fetchResourcesSuccess(response));
        }, (error) => {
            dispatch(fetchResourcesError(error));
        });
    }
}

function fetchResourcesReq() {
    return {
        type: FETCH_RESOURCES_REQUEST
    }
}

function fetchResourcesSuccess(response) {
    return {
        type: FETCH_RESOURCES_SUCCESS,
        response
    }
}

function fetchResourcesError(error) {
    return {
        type: FETCH_RESOURCES_ERROR,
        error
    }
}

function saveResourcesReq() {
    return {
        type: SAVE_RESOURCES_REQUEST
    }
}

function saveResourcesSuccess(response) {
    return {
        type: SAVE_RESOURCES_SUCCESS,
        response
    }
}

function saveResourcesError(error) {
    return {
        type: SAVE_RESOURCES_ERROR,
        error
    }
}