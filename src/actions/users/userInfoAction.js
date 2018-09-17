import { SET_USERINFO_PENDING, SET_USERINFO_SUCCESS, SET_USERINFO_ERROR} from '../../constants/dispatch';
import { callFetchUserApi } from '../../api/users/userApi';

export const fetchUserInfo = () => {
    return dispatch => {
        dispatch(setUserInfoPending(true));
        dispatch(setUserInfoSuccess(false, []));
        dispatch(setUserInfoError(null));

        return callFetchUserApi().then(
            response => {
            dispatch(setUserInfoPending(false));
                dispatch(setUserInfoSuccess(true, response));
            }, error => {
                dispatch(setUserInfoError(error));
            }
        );
    }
}

function setUserInfoPending(isUserInfoPending) {
    return {
        type: SET_USERINFO_PENDING,
        isUserInfoPending
    };
}

function setUserInfoSuccess(isUserInfoSuccess, userInfo) {
    return {
        type: SET_USERINFO_SUCCESS,
        isUserInfoSuccess,
        userInfo
    };
}

function setUserInfoError(userInfoError) {
    return {
        type: SET_USERINFO_ERROR,
        userInfoError
    }
}
