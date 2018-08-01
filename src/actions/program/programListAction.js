import { SET_FETCHPROGRAM_PENDING, SET_FETCHPROGRAM_SUCCESS, SET_FECTHPROGRAM_ERROR} from '../../constants/dispatch';
import { callFetchProgramApi } from '../../api/program/programListApi';

export const fetchProgramsList = (orgId) => {
    return dispatch => {
        dispatch(setFetchProgramPending(true));
        dispatch(setFetchProgramSuccess(false, []));
        dispatch(setFetchProgramError(null));

        callFetchProgramApi(orgId, (error, programList) => {
            dispatch(setFetchProgramPending(false));
            if (!error) {
                dispatch(setFetchProgramSuccess(true, programList));
            } else {
                dispatch(setFetchProgramError(error));
            }
        });
    }
}

function setFetchProgramPending(isFetchProgramPending) {
    return {
        type: SET_FETCHPROGRAM_PENDING,
        isFetchProgramPending
    };
}

function setFetchProgramSuccess(isFetchProgramSuccess, programList) {
    return {
        type: SET_FETCHPROGRAM_SUCCESS,
        isFetchProgramSuccess,
        programList
    };
}

function setFetchProgramError(fetchProgramError) {
    return {
        type: SET_FECTHPROGRAM_ERROR,
        fetchProgramError
    }
}
