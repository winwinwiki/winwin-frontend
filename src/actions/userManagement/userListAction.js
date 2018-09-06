import { SET_FETCHUSER_PENDING, SET_FETCHUSER_SUCCESS, SET_FETCHUSER_ERROR } from '../../constants/dispatch';
import { callFetchUserListApi } from '../../api/users/userApi'; 

export const fetchUsersList = () => {
    return dispatch => {
        dispatch(setFetchUserPending(true));
        dispatch(setFetchUserSuccess(false, []));
        dispatch(setFetchUserError(null));

        callFetchUserListApi((error, userList) => {
            dispatch(setFetchUserPending(false));
            if (!error) {
                dispatch(setFetchUserSuccess(true, userList));
            } else {
                dispatch(setFetchUserError(error));
            }
        });
    }
}

function setFetchUserPending(isFetchUserPending) {
    return {
        type: SET_FETCHUSER_PENDING,
        isFetchUserPending
    };
}

function setFetchUserSuccess(isFetchUserSuccess, userList) {
    return {
        type: SET_FETCHUSER_SUCCESS,
        isFetchUserSuccess,
        userList
    };
}

function setFetchUserError(fetchUserError) {
    return {
        type: SET_FETCHUSER_ERROR,
        fetchUserError
    }
}
