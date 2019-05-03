import {
  FETCH_DATASET_REQUEST,
  FETCH_DATASET_SUCCESS,
  FETCH_DATASET_ERROR,
  SAVE_DATASET_REQUEST,
  SAVE_DATASET_SUCCESS,
  SAVE_DATASET_ERROR,
  FETCH_PROG_DATASET_REQUEST,
  FETCH_PROG_DATASET_SUCCESS,
  FETCH_PROG_DATASET_ERROR,
  SAVE_PROG_DATASET_REQUEST,
  SAVE_PROG_DATASET_SUCCESS,
  SAVE_PROG_DATASET_ERROR,
  DELETE_DATASET_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false,
  saveData: null,
  saveError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_DATASET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_DATASET_SUCCESS:
      if (state.data.response.find(x => x.id === action.response.response.id)) {
        //when trying to edit
        return {
          ...state,
          data: {
            ...state.data,
            response: state.data.response.map(val =>
              val.id === action.response.response.id
                ? action.response.response
                : val
            )
          }
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            response: [...state.data.response, action.response.response]
          }
        };
      }

    case DELETE_DATASET_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          response: action.response //save filtered list
        }
      };

    case SAVE_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });

    //program
    case FETCH_PROG_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_PROG_DATASET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_PROG_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_PROG_DATASET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_PROG_DATASET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.response,
        saveError: false
      });
    case SAVE_PROG_DATASET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });

    default:
      return state;
  }
};
