import  { LOAD_USER_FROM_STORAGE } from '../../constants/dispatch';

function loadUserFromStorage(params) {
    return {
        type: LOAD_USER_FROM_STORAGE,
        data: params
    }
}

export function loadUserFromStorageAction(params){
    return function (dispatch) {
        return dispatch(loadUserFromStorage(params));
    }
}
