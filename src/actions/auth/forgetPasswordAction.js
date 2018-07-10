import { SET_FP_PENDING, SET_FP_SUCCESS, SET_FP_ERROR, SET_FPFORM_ERROR } from '../../constants/dispatch';
import { callFpApi } from '../../api/auth/forgetPasswordApi';
import validate from '../../util/validation';

export const onSubmit = (email, cb) => {
    return dispatch => {
        dispatch(setFpPending(true));
        dispatch(setFpSuccess(false));
        dispatch(setFpError(null));

        callFpApi(email, (error, res) => {
            dispatch(setFpPending(false));
            if (!error) {
                dispatch(setFpSuccess(true));
                cb();
            } else {
                dispatch(setFpError(error));
            }
        });
    }
}

export const validateFpForm = (value) => {
    return dispatch => {
        dispatch(setFpFormError({email: ''}));
        if(!value) { dispatch(setFpFormError({email: 'email is required.'} )); return; }
        let isValid = validate.email(value);
        if(!isValid) { dispatch(setFpFormError({email: 'enter valid email.'}));}
        return;
    }
}


function setFpPending(isFpPending) {
    return {
        type: SET_FP_PENDING,
        isFpPending
    };
}

function setFpSuccess(isFpSuccess) {
    return {
        type: SET_FP_SUCCESS,
        isFpSuccess
    };
}

function setFpError(isFpError) {
    return {
        type: SET_FP_ERROR,
        isFpError
    };
}

function setFpFormError(fpFormError) {
    return {
        type: SET_FPFORM_ERROR,
        fpFormError
    };
}
