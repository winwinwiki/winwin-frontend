import { FETCH_SDGTAGS_PENDING, FETCH_SDGTAGS_SUCCESS, FETCH_SDGTAGS_ERROR } from '../../constants/dispatch';
import { fetchOrgSdgTags } from '../../api/orgDetail/sdgTagsApi';

export const fetchSdgTagsList = (orgId, progId) => {
    return dispatch => {
        dispatch(setSdgTagsPending(true));
        dispatch(setSdgTagsSuccess(false, []));
        dispatch(setSdgTagsError(null));

        fetchOrgSdgTags(orgId, progId, (error, spiTagsList) => {
            dispatch(setSdgTagsPending(false));
            if (!error) {
                dispatch(setSdgTagsSuccess(true, spiTagsList));
            } else {
                dispatch(setSdgTagsError(error));
            }
        });
    }
}

function setSdgTagsPending(isSdgTagsPending) {
    return {
        type: FETCH_SDGTAGS_PENDING,
        isSdgTagsPending
    }
}

function setSdgTagsSuccess(isSdgTagsSuccess, sdgTagsList) {
    return {
        type: FETCH_SDGTAGS_SUCCESS,
        isSdgTagsSuccess,
        sdgTagsList
    }
}

function setSdgTagsError(isSdgTagsError) {
    return {
        type: FETCH_SDGTAGS_ERROR,
        isSdgTagsError
    }
}