import {
  FETCHORG_REQUEST, FETCHORG_SUCCESS, FECTHORG_ERROR, FILTER_ORG_LIST, SET_SDGLIST, SET_SPILIST,
  SET_APPLIED_FILTER
} from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false,
  appliedFilterList: null,
  isAppliedFilterVisible: false,
  spiList: null,
  sdgList: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHORG_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false,
      });

    case FETCHORG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false,
      });

    case FECTHORG_ERROR:
      return Object.assign({}, state, {
        fetchOrgError: action.fetchOrgError
      });

    case FILTER_ORG_LIST:
      return Object.assign({}, state, {
        orgList: action.filteredOrgList
      });

    case SET_SDGLIST:
      return Object.assign({}, state, {
        sdgList: action.sdgList["SDG"]
      });

    case SET_SPILIST:
      return Object.assign({}, state, {
        spiList: action.spiList
      });

    case SET_APPLIED_FILTER:
      return Object.assign({}, state, {
        appliedFilterList: action.appliedFilterList
    });

    default:
      return state;
  }
};