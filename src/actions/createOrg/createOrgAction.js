import { CREATEORG_REQUEST, CREATEORG_SUCCESS, CREATEORG_ERROR } from '../../constants/dispatch';
import { callCreateOrgApi } from '../../api/createOrg/createOrgApi';

export const onCreateOrg = (org) => {
    return dispatch => {
        dispatch(createOrgRequest());
        callCreateOrgApi(org, (error, res) => {
            if (!error) {
                dispatch(createOrgSuccess(res));
            } else {
                dispatch(createOrgError(error));
            }
        });
    }
}

function createOrgRequest() {
    return {
        type: CREATEORG_REQUEST
    };
}

function createOrgSuccess(response) {
    return {
        type: CREATEORG_SUCCESS,
        response
    };
}

function createOrgError(error) {
    return {
        type: CREATEORG_ERROR,
        error
    }
}