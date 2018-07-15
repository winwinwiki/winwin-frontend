import { SET_CREATEORG_PENDING, SET_CREATEORG_SUCCESS, SET_CREATEORG_ERROR, SET_CREATEORGFORM_ERROR } from '../../constants/dispatch';
import { callCreateOrgApi } from '../../api/createOrg/createOrgApi';
import validate from '../../util/validation';

export const onCreateOrg = (orgg, cb) => {
    return dispatch => {
        dispatch(setCreateOrgPending(true));
        dispatch(setCreateOrgSuccess(false));
        dispatch(setCreateOrgError(null));

        callCreateOrgApi(user.email, user.password, (error, res) => {
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
        if(field === 'email') {
            dispatch(setCreateOrgFormError({email: ''}));
            if(!value) { dispatch(setCreateOrgFormError({email: 'email is required.'} )); return; }
            let isValid = validate.email(value);
            if(!isValid) { dispatch(setCreateOrgFormError({email: 'enter valid email.'}));}
           return;
       } 
       dispatch(setCreateOrgFormError({password: ''}));
       if(!value) { dispatch(setCreateOrgFormError({password: 'password is required.'})); return; }
       let isValidPwd = validate.password(value);
       if(!isValidPwd) { dispatch(setCreateOrgFormError({password: 'enter valid password'}));}
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