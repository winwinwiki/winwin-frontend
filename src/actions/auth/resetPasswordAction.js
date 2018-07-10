import { SET_RESETPASSWORD_PENDING, SET_RESETPASSWORD_SUCCESS, SET_RESETPASSWORD_ERROR, SET_RESETFORM_ERROR } from '../../constants/dispatch';
import { callResetPwdApi } from '../../api/auth/resetPasswordApi';
import validate from '../../util/validation';

export const onResetPassword = (password, cb) => {
    return dispatch => {
        dispatch(setResetPasswordPending(true));
        dispatch(setResetPasswordSuccess(false));
        dispatch(setResetPasswordError(null));

        callResetPwdApi(password, (error, res) => {
            dispatch(setResetPasswordPending(false));
            if (!error) {
                dispatch(setResetPasswordSuccess(true));
                cb();
            } else {
                dispatch(setResetPasswordError(error));
            }
        });
    }
}

export const validateResetPasswordForm = (field, value) => {
    return dispatch => {
        if(field === 'password') {
            dispatch(setResetFormError({password: ''}));
            if(!value) { dispatch(setResetFormError({password: 'password is required.'} )); return; }
            let isValid = validate.password(value);
            if(!isValid) { dispatch(setResetFormError({password: 'enter valid password.'}));}
           return;
       } 
       dispatch(setResetFormError({confirmPassword: ''}));
       if(!value) { dispatch(setResetFormError({confirmPassword: 'confirm password is required.'})); return; }
       let isValidPwd = validate.confirmPassword(value);
       if(!isValidPwd) { dispatch(setResetFormError({confirmPassword: 'password doen`t match'}));}
    }
}

function setResetPasswordPending(isResetPwdPending) {
    return {
        type: SET_RESETPASSWORD_PENDING,
        isResetPwdPending
    };
}

function setResetPasswordSuccess(isResetPwdSuccess) {
    return {
        type: SET_RESETPASSWORD_SUCCESS,
        isResetPwdSuccess
    };
}

function setResetPasswordError(resetPwdError) {
    return {
        type: SET_RESETPASSWORD_ERROR,
        resetPwdError
    }
}

function setResetFormError(resetFormError) {
    return {
        type: SET_RESETFORM_ERROR,
        resetFormError
    }
}