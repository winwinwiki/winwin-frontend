import { SET_DATAFEED_PENDING, SET_DATAFEED_SUCCESS, SET_DATAFEED_ERROR, SET_DATAFEEDFORM_ERROR } from '../../constants/dispatch';
import {REQ_DATA_FEED_FILE, VALID_DATA_FEED_FILE, REQ_ORG_LOCATION} from '../../constants/error';

import { callCreateOrgApi } from '../../api/createOrg/createOrgApi';
import validate from '../../util/validation';

export const onDataFeed = (org, cb) => {
    return dispatch => {
        dispatch(setDataFeedPending(true));
        dispatch(setDataFeedSuccess(false));
        dispatch(setDataFeedError(null));

        callCreateOrgApi(org, (error, res) => {
            dispatch(setDataFeedPending(false));
            if (!error) {
                dispatch(setDataFeedSuccess(true));
                cb();
            } else {
                dispatch(setDataFeedError(error));
            }
        });
    }
}

export const validateDataFeedForm = (field, value) => {
    return dispatch => {
        if(field === 'file') {
            dispatch(setDataFeedFormError({file: ''}));
            if(!value) { dispatch(setDataFeedFormError({file: REQ_DATA_FEED_FILE} )); return; }
            let isValid = validate.file(value);
            if(!isValid) { dispatch(setDataFeedFormError({file: VALID_DATA_FEED_FILE}));}
           return;
       } 
       dispatch(setDataFeedFormError({location: ''}));
       if(!value) { dispatch(setDataFeedFormError({location: REQ_ORG_LOCATION})); return; }
    }
}

function setDataFeedPending(isDataFeedPending) {
    return {
        type: SET_DATAFEED_PENDING,
        isDataFeedPending
    };
}

function setDataFeedSuccess(isDataFeedSuccess) {
    return {
        type: SET_DATAFEED_SUCCESS,
        isDataFeedSuccess
    };
}

function setDataFeedError(dataFeedError) {
    return {
        type: SET_DATAFEED_ERROR,
        dataFeedError
    }
}

function setDataFeedFormError(dataFeedFormError) {
    return {
        type: SET_DATAFEEDFORM_ERROR,
        dataFeedFormError
    }
}