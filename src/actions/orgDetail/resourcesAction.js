import { FETCH_RESOURCES_REQUEST, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR,
    SAVE_RESOURCES_REQUEST, SAVE_RESOURCES_SUCCESS, SAVE_RESOURCES_ERROR  } from '../../constants/dispatch';
import { setResourcesApi, fetchResourcesApi } from '../../api/orgDetail/resourcesApi';

export const saveOrgResources = (regions) => {
    return dispatch => {
        dispatch(saveResourcesReq());

        setResourcesApi(regions, (error, response) => {
            if (!error) {
                dispatch(saveResourcesSuccess(response));
            } else {
                dispatch(saveResourcesError(error));
            }
        });
    }
}


export const fetchOrgResources = () => {
    return dispatch => {
        dispatch(fetchResourcesReq());

        fetchResourcesApi((error, response) => {
            if (!error) {
                dispatch(fetchResourcesSuccess(response));
            } else {
                dispatch(fetchResourcesError(error));
            }
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