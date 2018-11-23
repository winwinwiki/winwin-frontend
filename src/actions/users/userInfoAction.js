import { USERINFO_REQUEST, USERINFO_SUCCESS, USERINFO_ERROR} from '../../constants/dispatch';
import { api } from '../../api/api';

export const fetchUserInfo = () => {
    return dispatch => {
        dispatch(userInfoRequest());
        return api('/user/1','GET', {}, true).then(
            response => {
                dispatch(userInfoSuccess(response));
            }, error => {
                dispatch(userInfoError(error));
            }
        );
    }
}

function userInfoRequest() {
    return {
        type: USERINFO_REQUEST
    };
}

function userInfoSuccess(response) {
    return {
        type: USERINFO_SUCCESS,
        response
    };
}

function userInfoError(error) {
    return {
        type: USERINFO_ERROR,
        error
    }
}
