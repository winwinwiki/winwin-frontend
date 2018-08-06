import { FETCH_DATASET_PENDING, FETCH_DATASET_SUCCESS, FETCH_DATASET_ERROR,
    SET_DATASET_PENDING, SET_DATASET_SUCCESS, SET_DATASET_ERROR  } from '../../constants/dispatch';
import { setDataSetApi, fetchDataSetApi } from '../../api/orgDetail/dataSetApi';

export const setOrgDataSets = (regions) => {
    return dispatch => {
        dispatch(setDataSetPending(true));
        dispatch(setDataSetSuccess(false, []));
        dispatch(setDataSetError(null));

        setDataSetApi(regions, (error, dataSetList) => {
            dispatch(setDataSetPending(false));
            if (!error) {
                dispatch(setDataSetSuccess(true, dataSetList));
            } else {
                dispatch(setDataSetError(error));
            }
        });
    }
}


export const fetchOrgDataSets = () => {
    return dispatch => {
        dispatch(fetchDataSetPending(true));
        dispatch(fetchDataSetSuccess(false, []));
        dispatch(fetchDataSetError(null));

        fetchDataSetApi((error, dataSetList) => {
            dispatch(fetchDataSetPending(false));
            if (!error) {
                dispatch(fetchDataSetSuccess(true, dataSetList));
            } else {
                dispatch(fetchDataSetError(error));
            }
        });
    }
}

function fetchDataSetPending(isDataSetPending) {
    return {
        type: FETCH_DATASET_PENDING,
        isDataSetPending
    }
}

function fetchDataSetSuccess(isDataSetSuccess, dataSetList) {
    return {
        type: FETCH_DATASET_SUCCESS,
        isDataSetSuccess,
        dataSetList
    }
}

function fetchDataSetError(isDataSetError) {
    return {
        type: FETCH_DATASET_ERROR,
        isDataSetError
    }
}

function setDataSetPending(isDataSetPending) {
    return {
        type: SET_DATASET_PENDING,
        isDataSetPending
    }
}

function setDataSetSuccess(isDataSetSuccess, dataSetList) {
    return {
        type: SET_DATASET_SUCCESS,
        isDataSetSuccess,
        dataSetList
    }
}

function setDataSetError(isDataSetError) {
    return {
        type: SET_DATASET_ERROR,
        isDataSetError
    }
}