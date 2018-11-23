import { FETCH_DATASET_REQUEST, FETCH_DATASET_SUCCESS, FETCH_DATASET_ERROR,
    SAVE_DATASET_REQUEST, SAVE_DATASET_SUCCESS, SAVE_DATASET_ERROR  } from '../../constants/dispatch';
import { setDataSetApi, fetchDataSetApi } from '../../api/orgDetail/dataSetApi';

export const saveOrgDataSets = (regions) => {
    return dispatch => {
        dispatch(saveDataSetReq());

        setDataSetApi(regions, (error, response) => {
            if (!error) {
                dispatch(saveDataSetSuccess(response));
            } else {
                dispatch(saveDataSetError(error));
            }
        });
    }
}


export const fetchOrgDataSets = () => {
    return dispatch => {
        dispatch(fetchDataSetReq());

        fetchDataSetApi((error, response) => {
            if (!error) {
                dispatch(fetchDataSetSuccess(response));
            } else {
                dispatch(fetchDataSetError(error));
            }
        });
    }
}

function fetchDataSetReq() {
    return {
        type: FETCH_DATASET_REQUEST
    }
}

function fetchDataSetSuccess(response) {
    return {
        type: FETCH_DATASET_SUCCESS,
        response
    }
}

function fetchDataSetError(error) {
    return {
        type: FETCH_DATASET_ERROR,
        error
    }
}

function saveDataSetReq() {
    return {
        type: SAVE_DATASET_REQUEST
    }
}

function saveDataSetSuccess(response) {
    return {
        type: SAVE_DATASET_SUCCESS,
        response
    }
}

function saveDataSetError(error) {
    return {
        type: SAVE_DATASET_ERROR,
        error
    }
}