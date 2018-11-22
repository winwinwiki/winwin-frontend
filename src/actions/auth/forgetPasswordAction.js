import { FP_REQUEST, FP_SUCCESS, FP_ERROR } from '../../constants/dispatch';
import { callFpApi } from '../../api/auth/forgetPasswordApi';

export const onSubmit = (email, cb) => {
    return dispatch => {
        dispatch(fpRequest());
        callFpApi(email, (error, res) => {
            if (!error) {
                dispatch(fpSuccess(res));
                cb();
            } else {
                dispatch(fpError(error));
            }
        });
    }
}

function fpRequest() {
    return {
        type: FP_REQUEST
    };
}

function fpSuccess(response) {
    return {
        type: FP_SUCCESS,
        response
    };
}

function fpError(error) {
    return {
        type: FP_ERROR,
        error
    };
}

