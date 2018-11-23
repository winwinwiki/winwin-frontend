import { FETCH_SPITAGS_REQUEST, FETCH_SPITAGS_SUCCESS, FETCH_SPITAGS_ERROR } from '../../constants/dispatch';
import { fetchOrgSpiTags } from '../../api/orgDetail/spiTagsApi';

export const fetchSpiTags = (orgId, progId) => {
    return dispatch => {
        dispatch(spiTagsRequest());
        fetchOrgSpiTags(orgId, progId, (error, response) => {
            if (!error) {
                dispatch(spiTagsSuccess(response));
            } else {
                dispatch(spiTagsError(error));
            }
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