import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../../constants/dispatch';
import { api } from '../../api/api';

export const onLogin = (user) => {
    return dispatch => {
        dispatch(loginRequest());
        return api("/users", "POST", { username: user.email, password: user.password }, false).then((response) => {
            if (response) {
                dispatch(loginSuccess(response));
                localStorage.setItem('_authId', response);
            }
        }, (error) => {
            dispatch(loginError(error));
        }
        );
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