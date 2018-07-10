import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_FORM_ERROR } from '../../constants/dispatch';
import { callLoginApi } from '../../api/auth/loginApi';
import validate from '../../util/validation';

export const onLogin = (user, cb) => {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(user.email, user.password, (error, res) => {
            dispatch(setLoginPending(false));
            if (!error) {
                dispatch(setLoginSuccess(true));
                cb();
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

export const validateLoginForm = (field, value) => {
    return dispatch => {
        if(field === 'email') {
            dispatch(setFormError({email: ''}));
            if(!value) { dispatch(setFormError({email: 'email is required.'} )); return; }
            let isValid = validate.email(value);
            if(!isValid) { dispatch(setFormError({email: 'enter valid email.'}));}
           return;
       } 
       dispatch(setFormError({password: ''}));
       if(!value) { dispatch(setFormError({password: 'password is required.'})); return; }
       let isValidPwd = validate.password(value);
       if(!isValidPwd) { dispatch(setFormError({password: 'enter valid password'}));}
    }
}

function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}

function setFormError(formError) {
    return {
        type: SET_FORM_ERROR,
        formError
    }
}