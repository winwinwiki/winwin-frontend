import {
  FETCHORG_REQUEST,
  FETCHORG_SUCCESS,
  FECTHORG_ERROR,
  SET_SDGLIST_REQUEST,
  SET_SDGLIST_SUCCESS,
  SET_SDGLIST_ERROR,
  SET_SPILIST_REQUEST,
  SET_SPILIST_SUCCESS,
  SET_SPILIST_ERROR,
  SET_APPLIED_FILTER,
  SET_FILTERS
} from "../../constants/dispatch";

import {
  APPLIED_ORG_FILTER_LSO_NAME
} from '../../constants';

import { addToLocalStorageObject } from "../../util/util";

const initialState = {
  loading: false,
  data: null,
  error: false,
  appliedFilterList: null,
  isAppliedFilterVisible: false,
  filters: null,
  spiList: null,
  sdgList: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHORG_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case FETCHORG_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FECTHORG_ERROR:
      return Object.assign({}, state, {
        loading: true,
        data: action.error,
        error: true
      });

    case SET_SDGLIST_REQUEST:
      return Object.assign({}, state, {});

    case SET_SDGLIST_SUCCESS:
      return Object.assign({}, state, {
        sdgList: action.response
      });

    case SET_SDGLIST_ERROR:
      return Object.assign({}, state, {});

    case SET_SPILIST_REQUEST:
      return Object.assign({}, state, {});

    case SET_SPILIST_SUCCESS:
      return Object.assign({}, state, {
        spiList: action.response
      });

    case SET_SPILIST_ERROR:
      return Object.assign({}, state, {});

    case SET_APPLIED_FILTER:

      // Update local storage with current state of filters
      let filters = Object.assign({}, action.appliedFilterList);
      addToLocalStorageObject(APPLIED_ORG_FILTER_LSO_NAME, 'appliedFilters', filters);

      return Object.assign({}, state, {
        appliedFilterList: action.appliedFilterList
      });
    case SET_FILTERS:
      return Object.assign({}, state, {
        filters: action.filters
      });

    default:
      return state;
  }
};
