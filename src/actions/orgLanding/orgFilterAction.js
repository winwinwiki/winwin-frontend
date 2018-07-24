import { SET_APPLIED_FILTER,
    SET_APPLIED_FILTER_FLAG, SET_FILTERED_LIST_ERROR, SET_FILTERED_LIST_SUCCESS, SET_FILTERED_LIST_PENDING } from '../../constants/dispatch';
import {callFilterOrgApi} from '../../api/orgLanding/orgFilterAction';

export const setAppliedFilters = (filterList) => {
    return dispatch => {
        dispatch(setAplliedFiltersList(filterList));
        fetchOrgList(dispatch, filterList);
    }
}

export const fetchFilteredOrgList = (filterList) => {
    return dispatch => {
        fetchOrgList(dispatch, filterList);
    }
}

function fetchOrgList(dispatch, filterList) {
    dispatch(setFilteredListPending(true));
        dispatch(setFilteredListSuccess(false, []));
        dispatch(setFilteredListError(null));

        callFilterOrgApi(filterList, (error, orgList) => {
            dispatch(setFilteredListPending(false));
            if (!error) {
                dispatch(setFilteredListSuccess(true, orgList));
            } else {
                dispatch(setFilteredListError(error));
            }
        });
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

function setFilteredListPending(isFilteredListPending) {
    return {
        type: SET_FILTERED_LIST_PENDING,
        isFilteredListPending
    }
}

function setFilteredListSuccess(isFilteredListSuccess, orgList) {
    return {
        type: SET_FILTERED_LIST_SUCCESS,
        isFilteredListSuccess,
        orgList
    }
}

function setFilteredListError(isFilteredListError) {
    return {
        type: SET_FILTERED_LIST_ERROR,
        isFilteredListError
    }
}