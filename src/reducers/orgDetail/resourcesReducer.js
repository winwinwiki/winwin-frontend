import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR,
  SAVE_RESOURCES_REQUEST,
  SAVE_RESOURCES_SUCCESS,
  SAVE_RESOURCES_ERROR,
  DELETE_RESOURCE_SUCCESS
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
    case FETCH_RESOURCES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_RESOURCES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_RESOURCES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_RESOURCES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveData: null,
        saveError: false
      });
    case SAVE_RESOURCES_SUCCESS:
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
    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          response: action.response
        }
      };

    case SAVE_RESOURCES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        saveData: action.error,
        saveError: true
      });

    default:
      return state;
  }
};
