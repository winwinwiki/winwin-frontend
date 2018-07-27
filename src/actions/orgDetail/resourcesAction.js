import { FETCH_RESOURCES_PENDING, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR,
    SET_RESOURCES_PENDING, SET_RESOURCES_SUCCESS, SET_RESOURCES_ERROR  } from '../../constants/dispatch';
import { setResourcesApi, fetchResourcesApi } from '../../api/orgDetail/resourcesApi';

export const setOrgResources = (regions) => {
    return dispatch => {
        dispatch(setResourcesPending(true));
        dispatch(setResourcesSuccess(false, []));
        dispatch(setResourcesError(null));

        setResourcesApi(regions, (error, resourcesList) => {
            dispatch(setResourcesPending(false));
            if (!error) {
                dispatch(setResourcesSuccess(true, resourcesList));
            } else {
                dispatch(setResourcesError(error));
            }
        });
    }
}


export const fetchOrgResources = () => {
    return dispatch => {
        dispatch(fetchResourcesPending(true));
        dispatch(fetchResourcesSuccess(false, []));
        dispatch(fetchResourcesError(null));

        fetchResourcesApi((error, resourcesList) => {
            dispatch(fetchResourcesPending(false));
            if (!error) {
                dispatch(fetchResourcesSuccess(true, resourcesList));
            } else {
                dispatch(fetchResourcesError(error));
            }
        });
    }
}

function fetchResourcesPending(isResourcesPending) {
    return {
        type: FETCH_RESOURCES_PENDING,
        isResourcesPending
    }
}

function fetchResourcesSuccess(isResourcesSuccess, resourcesList) {
    return {
        type: FETCH_RESOURCES_SUCCESS,
        isResourcesSuccess,
        resourcesList
    }
}

function fetchResourcesError(isResourcesError) {
    return {
        type: FETCH_RESOURCES_ERROR,
        isResourcesError
    }
}

function setResourcesPending(isResourcesPending) {
    return {
        type: SET_RESOURCES_PENDING,
        isResourcesPending
    }
}

function setResourcesSuccess(isResourcesSuccess, resourcesList) {
    return {
        type: SET_RESOURCES_SUCCESS,
        isResourcesSuccess,
        resourcesList
    }
}

function setResourcesError(isResourcesError) {
    return {
        type: SET_RESOURCES_ERROR,
        isResourcesError
    }
}