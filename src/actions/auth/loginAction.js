import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../../constants/dispatch';
import { api } from '../../api/api';

export const onLogin = (params) => {
    return dispatch => {
        dispatch(loginRequest());
        return api("/users", "POST", params, false).then((response) => {
            dispatch(loginSuccess(response));
        }, (error) => {
            dispatch(loginError(error));
        });
    }
}

export const logoutAction = () => {
    return dispatch => {
        dispatch(logout());
    }
}

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    };
}

function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        response
    };
}

function loginError(error) {
    return {
        type: LOGIN_ERROR,
        error
    }
}

function logout() {
    return {
        type: LOGOUT
    };
}