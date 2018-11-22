import { RESETPASSWORD_REQUEST, RESETPASSWORD_SUCCESS, RESETPASSWORD_ERROR } from '../../constants/dispatch';
import { callResetPwdApi } from '../../api/auth/resetPasswordApi';

export const onResetPassword = (password) => {
    return dispatch => {
        dispatch(rpRequest());

        callResetPwdApi(password, (error, res) => {
            if (!error) {
                dispatch(rpSuccess(res));
            } else {
                dispatch(rpError(error));
            }
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