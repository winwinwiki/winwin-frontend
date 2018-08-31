import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_FORM_ERROR } from '../../constants/dispatch';
import { callLoginApi } from '../../api/auth/loginApi';
import validate from '../../util/validation';

export const onLogin = (user) => {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        return callLoginApi(user.email, user.password).then((res) => {
            dispatch(setLoginPending(false));
            if (res) {
                dispatch(setLoginSuccess(true));
                localStorage.setItem('_token', res._token);
            }
        }, (error) => {
            dispatch(setLoginError(error));
        }
        );
    }
}

export const validateLoginForm = (field, value) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            if (field === 'email') {
                dispatch(setFormError({ email: '' }));
                if (!value) { dispatch(setFormError({ email: 'email is required.' })); return;}
                let isValid = validate.email(value);
                if (!isValid) { dispatch(setFormError({ email: 'enter valid email.' })); } else{
                    resolve();
                }
                return;
            }
            dispatch(setFormError({ password: '' }));
            if (!value) { dispatch(setFormError({ password: 'password is required.' })); return;}
            let isValidPwd = validate.password(value);
            if (!isValidPwd) { dispatch(setFormError({ password: 'enter valid password' }));} else {resolve();}
        });
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