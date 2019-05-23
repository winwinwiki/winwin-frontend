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
  FILTER_PROG_ERROR,
  FETCH_DATASET_CATEGORIES_SUCCESS,
  FETCH_DATASET_CATEGORIES_REQUEST,
  FETCH_DATASET_CATEGORIES_ERROR,
  FETCH_RESOURCE_CATEGORIES_REQUEST,
  FETCH_RESOURCE_CATEGORIES_SUCCESS,
  FETCH_RESOURCE_CATEGORIES_ERROR,
  SAVE_DATASET_REQUEST,
  SAVE_DATASET_SUCCESS,
  SAVE_DATASET_ERROR,
  DELETE_DATASET_REQUEST,
  DELETE_DATASET_SUCCESS,
  DELETE_DATASET_ERROR,
  SAVE_RESOURCES_REQUEST,
  SAVE_RESOURCES_SUCCESS,
  SAVE_RESOURCES_ERROR,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_ERROR,
  SET_FETCHORGHEIRARCHY_PENDING,
  SET_FETCHORGHEIRARCHY_SUCCESS,
  ADD_PROGRAM_REQUEST,
  ADD_PROGRAM_SUCCESS,
  ADD_PROGRAM_ERROR,
  FETCH_PROG_REQUEST,
  FETCH_PROG_SUCCESS,
  FETCH_PROG_ERROR,
  FETCH_PROGDETAIL_REQUEST,
  FETCH_PROGDETAIL_SUCCESS
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

    //data set categories
    case FETCH_DATASET_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_DATASET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FETCH_DATASET_CATEGORIES_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //EDIT/ SAVE data set
    case SAVE_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case SAVE_DATASET_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case SAVE_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //DELETE data set
    case DELETE_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case DELETE_DATASET_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case DELETE_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //resources categories
    case FETCH_RESOURCE_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_RESOURCE_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FETCH_RESOURCE_CATEGORIES_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //EDIT/ SAVE RESOURCES
    case SAVE_RESOURCES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case SAVE_RESOURCES_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case SAVE_RESOURCES_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //DELETE data set
    case DELETE_RESOURCE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case DELETE_RESOURCE_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case DELETE_RESOURCE_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    //org tree
    case SET_FETCHORGHEIRARCHY_PENDING:
      return Object.assign({}, state, {
        loading: true
      });

    case SET_FETCHORGHEIRARCHY_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    //ADD PROGRAM
    case ADD_PROGRAM_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case ADD_PROGRAM_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case ADD_PROGRAM_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    // PROGRAM LIST
    case FETCH_PROG_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_PROG_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case FETCH_PROG_ERROR:
      return Object.assign({}, state, {
        loading: false
      });

    // PROGRAM DETAILS
    case FETCH_PROGDETAIL_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case FETCH_PROGDETAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    default:
      return state;
  }
};
