import {
  SET_FETCHORG_PENDING, SET_FETCHORG_SUCCESS, SET_FECTHORG_ERROR, FILTER_ORG_LIST,
  SET_APPLIED_FILTER_FLAG, SET_SDGLIST, SET_SPILIST
} from '../../constants/dispatch';

const initialState = {
  isFetchOrgSuccess: false,
  isFetchOrgPending: false,
  fetchOrgError: null,
  appliedFilterList: [],
  isAppliedFilterVisible: false,
  orgList: [],
  spiList: null,
  sdgList: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHORG_PENDING:
      return Object.assign({}, state, {
        isFetchOrgPending: action.isFetchOrgPending
      });

    case SET_FETCHORG_SUCCESS:
      return Object.assign({}, state, {
        isFetchOrgSuccess: action.isFetchOrgSuccess,
        orgList: action.orgList
      });

    case SET_FECTHORG_ERROR:
      return Object.assign({}, state, {
        fetchOrgError: action.fetchOrgError
      });

    case FILTER_ORG_LIST:
      return Object.assign({}, state, {
        orgList: action.filteredOrgList
      });

    case SET_SDGLIST:
      return Object.assign({}, state, {
        sdgList: action.sdgList
      });

    case SET_SPILIST:
      return Object.assign({}, state, {
        spiList: action.spiList
      });

    default:
      return state;
  }
};