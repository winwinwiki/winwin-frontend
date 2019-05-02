import {
  LOADER_START,
  LOADER_STOP,
  LOGIN_ERROR,
  USERINFO_REQUEST,
  USERINFO_SUCCESS,
  USERINFO_ERROR,
  LOGIN_SUCCESS,
  FETCHORG_REQUEST,
  FETCHORG_SUCCESS,
  FETCH_NAICS_LIST_REQUEST,
  FETCH_NAICS_LIST_SUCCESS,
  FETCH_NAICS_LIST_ERROR,
  FETCH_NTEE_LIST_REQUEST,
  FETCH_NTEE_LIST_SUCCESS,
  FETCH_NTEE_LIST_ERROR,
  FILTER_PROG_REQUEST,
  FILTER_PROG_SUCCESS,
  FILTER_PROG_ERROR
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADER_START:
      return Object.assign({}, state, {
        loading: true,
        message: action.data
      });
    case LOADER_STOP:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case FETCHORG_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCHORG_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case LOGIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        message: null
      });

    case USERINFO_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case USERINFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case USERINFO_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //naics
    case FETCH_NAICS_LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_NAICS_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FETCH_NAICS_LIST_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //ntee
    case FETCH_NTEE_LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_NTEE_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FETCH_NTEE_LIST_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //filter programs list
    case FILTER_PROG_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FILTER_PROG_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FILTER_PROG_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    default:
      return state;
  }
};
