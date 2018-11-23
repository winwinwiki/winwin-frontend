import { RESETPASSWORD_REQUEST, RESETPASSWORD_SUCCESS, RESETPASSWORD_ERROR } from '../../constants/dispatch';
import { api } from '../../api/api';

export const onResetPassword = (params) => {
    return dispatch => {
        dispatch(rpRequest());
        api("/users", "POST", params, true).then((response) => {
            dispatch(rpSuccess(response));
        }, (error) => {
            dispatch(rpError(error));
        });
    }
}

function rpRequest() {
    return {
        type: RESETPASSWORD_REQUEST
    };
}

function rpSuccess(response) {
    return {
        type: RESETPASSWORD_SUCCESS,
        response
    };
}

function rpError(error) {
    return {
        type: RESETPASSWORD_ERROR,
        error
    }
}