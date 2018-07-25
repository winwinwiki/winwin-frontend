import { FETCH_SPITAGS_ERROR, FETCH_SPITAGS_SUCCESS, FETCH_SPITAGS_PENDING } from '../../constants/dispatch';
import { fetchOrgSpiTags } from '../../api/orgDetail/spiTagsApi';

export const fetchSpiTagsList = (orgId, progId) => {
    return dispatch => {
        dispatch(setSpiTagsPending(true));
        dispatch(setSpiTagsSuccess(false, []));
        dispatch(setSpiTagsError(null));

        fetchOrgSpiTags(orgId, progId, (error, spiTagsList) => {
            dispatch(setSpiTagsPending(false));
            if (!error) {
                dispatch(setSpiTagsSuccess(true, spiTagsList));
            } else {
                dispatch(setSpiTagsError(error));
            }
        });
    }
}

function setSpiTagsPending(isSpiTagsPending) {
    return {
        type: FETCH_SPITAGS_PENDING,
        isSpiTagsPending
    }
}

function setSpiTagsSuccess(isSpiTagsSuccess, spiTagsList) {
    return {
        type: FETCH_SPITAGS_SUCCESS,
        isSpiTagsSuccess,
        spiTagsList
    }
}

function setSpiTagsError(isSpiTagsError) {
    return {
        type: FETCH_SPITAGS_ERROR,
        isSpiTagsError
    }
}