import { FP_REQUEST, FP_SUCCESS, FP_ERROR } from '../../constants/dispatch';
import { api } from '../../api/api';

export const onSubmit = (params) => {
    return dispatch => {
        dispatch(fpRequest());
        api("/users", "POST", params, true).then((response) => {
            dispatch(fpSuccess(response));
        }, (error) => {
            dispatch(fpError(error));
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

