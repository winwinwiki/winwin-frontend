import { FETCH_SDGTAGS_REQUEST, FETCH_SDGTAGS_SUCCESS, FETCH_SDGTAGS_ERROR } from '../../constants/dispatch';
import { fetchOrgSdgTags } from '../../api/orgDetail/sdgTagsApi';

export const fetchSdgTags = (orgId, progId) => {
    return dispatch => {
        dispatch(sdgTagsRequest());
        fetchOrgSdgTags(orgId, progId, (error, response) => {
            if (!error) {
                dispatch(sdgTagsSuccess(response));
            } else {
                dispatch(sdgTagsError(error));
            }
        });
    }
}

function sdgTagsRequest() {
    return {
        type: FETCH_SDGTAGS_REQUEST
    }
}

function sdgTagsSuccess(response) {
    return {
        type: FETCH_SDGTAGS_SUCCESS,
        response
    }
}

function sdgTagsError(error) {
    return {
        type: FETCH_SDGTAGS_ERROR,
        error
    }
}