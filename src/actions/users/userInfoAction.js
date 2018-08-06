import { SET_USERINFO_PENDING, SET_USERINFO_SUCCESS, SET_USERINFO_ERROR} from '../../constants/dispatch';
import { callFetchUserApi } from '../../api/users/userApi';

export const fetchUserInfo = () => {
    return dispatch => {
        dispatch(setUserInfoPending(true));
        dispatch(setUserInfoSuccess(false, []));
        dispatch(setUserInfoError(null));

        callFetchUserApi((error, userInfo) => {
            dispatch(setUserInfoPending(false));
            if (!error) {
                dispatch(setUserInfoSuccess(true, userInfo));
            } else {
                dispatch(setUserInfoError(error));
            }
        });
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
