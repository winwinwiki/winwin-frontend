import {
  SET_FETCHORGHISTORY_PENDING,
  SET_FETCHORGHISTORY_SUCCESS,
  SET_FECTHORGHISTORY_ERROR
} from "../../constants/dispatch";

const initialState = {
  isFetchOrgHistoryPending: false,
  isFetchOrgHistorySuccess: false,
  fetchOrgHistoryError: null,
  orgHistory: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHORGHISTORY_PENDING:
      return Object.assign({}, state, {
        isFetchOrgHistoryPending: action.isFetchOrgHistoryPending
      });

    case SET_FETCHORGHISTORY_SUCCESS:
      return Object.assign({}, state, {
        isFetchOrgHistorySuccess: action.isFetchOrgHistorySuccess,
        orgHistory: action.orgHistory.response
      });

    case SET_FECTHORGHISTORY_ERROR:
      return Object.assign({}, state, {
        fetchOrgHistoryError: action.fetchOrgHistoryError
      });

    default:
      return state;
  }
};
