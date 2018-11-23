import { DATA_FEED_REQUEST,  DATA_FEED_SUCCESS,  DATA_FEED_ERROR} from '../../constants/dispatch';
import { api } from '../../api/api';

export const onDataFeed = (params) => {
    return dispatch => {
        dispatch(dataFeedReq());
        api("/users", "POST", params, true).then((response) => {
            dispatch(dataFeedSuccess(response));
        }, (error) => {
            dispatch(dataFeedError(error));
        });
    }
}

function dataFeedReq() {
    return {
        type: DATA_FEED_REQUEST
    };
}

function dataFeedSuccess(response) {
    return {
        type: DATA_FEED_SUCCESS,
        response
    };
}

function dataFeedError(error) {
    return {
        type: DATA_FEED_ERROR,
        error
    }
}