import { SET_APPLIED_FILTER,
    SET_APPLIED_FILTER_FLAG } from '../../constants/dispatch';

export const setAppliedFilters = (filterList) => {
    return dispatch => {
        dispatch(setAplliedFiltersList(filterList));
    }
}

export const showAppliedFilterModal = (isAppliedFilterVisible) => {
    return dispatch => {
        dispatch(setAppliedilterFlag(isAppliedFilterVisible))
    }
}


function setAplliedFiltersList(appliedFilterList) {
    return {
        type: SET_APPLIED_FILTER,
        appliedFilterList
    }
}

function setAppliedilterFlag(isAppliedFilterVisible) {
    return {
        type: SET_APPLIED_FILTER_FLAG,
        isAppliedFilterVisible
    }
}