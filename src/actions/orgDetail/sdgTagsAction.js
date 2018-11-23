import { FETCH_SDGTAGS_REQUEST, FETCH_SDGTAGS_SUCCESS, FETCH_SDGTAGS_ERROR } from '../../constants/dispatch';
import { api } from '../../api/api';

export const fetchSdgTags = () => {
    return dispatch => {
        dispatch(sdgTagsRequest());
        api("/sdg-tags", "GET", {}, true).then((response) => {
            dispatch(sdgTagsSuccess(response));
        }, (error) => {
            dispatch(sdgTagsError(error));
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