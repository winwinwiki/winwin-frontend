import { SET_CREATEORG_PENDING, SET_CREATEORG_SUCCESS, SET_CREATEORG_ERROR, SET_CREATEORGFORM_ERROR } from '../../constants/dispatch';
import {REQ_ORG_NAME, VALID_ORG_NAME, REQ_ORG_LOCATION} from '../../constants/error';

import { callCreateOrgApi } from '../../api/createOrg/createOrgApi';
import validate from '../../util/validation';

export const onCreateOrg = (org, cb) => {
    return dispatch => {
        dispatch(setCreateOrgPending(true));
        dispatch(setCreateOrgSuccess(false));
        dispatch(setCreateOrgError(null));

        callCreateOrgApi(org, (error, res) => {
            dispatch(setCreateOrgPending(false));
            if (!error) {
                dispatch(setCreateOrgSuccess(true));
                cb();
            } else {
                dispatch(setCreateOrgError(error));
            }
        });
    }
}

export const validateCreateOrgForm = (field, value) => {
    return dispatch => {
        if(field === 'orgName') {
            dispatch(setCreateOrgFormError({orgName: ''}));
            if(!value) { dispatch(setCreateOrgFormError({orgName: REQ_ORG_NAME} )); return; }
            let isValid = validate.name(value);
            if(!isValid) { dispatch(setCreateOrgFormError({orgName: VALID_ORG_NAME}));}
           return;
       } 
       dispatch(setCreateOrgFormError({location: ''}));
       if(!value) { dispatch(setCreateOrgFormError({location: REQ_ORG_LOCATION})); return; }
    }
}

function setCreateOrgPending(isCreateOrgPending) {
    return {
        type: SET_CREATEORG_PENDING,
        isCreateOrgPending
    };
}

function setCreateOrgSuccess(isCreateOrgSuccess) {
    return {
        type: SET_CREATEORG_SUCCESS,
        isCreateOrgSuccess
    };
}

function setCreateOrgError(createOrgError) {
    return {
        type: SET_CREATEORG_ERROR,
        createOrgError
    }
}

function setCreateOrgFormError(createOrgFormError) {
    return {
        type: SET_CREATEORGFORM_ERROR,
        createOrgFormError
    }
}