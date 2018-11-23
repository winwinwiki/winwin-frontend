import { FETCH_SPITAGS_REQUEST, FETCH_SPITAGS_SUCCESS, FETCH_SPITAGS_ERROR } from '../../constants/dispatch';
import { api } from '../../api/api';

export const fetchSpiTags = () => {
    return dispatch => {
        dispatch(spiTagsRequest());
        api("/spi-tags", "GET", {}, true).then((response) => {
            dispatch(spiTagsSuccess(response));
        }, (error) => {
            dispatch(spiTagsError(error));
        });
    }
}

function spiTagsRequest() {
    return {
        type: FETCH_SPITAGS_REQUEST
    }
}

function spiTagsSuccess(response) {
    return {
        type: FETCH_SPITAGS_SUCCESS,
        response
    }
}

function spiTagsError(error) {
    return {
        type: FETCH_SPITAGS_ERROR,
        error
    }
}