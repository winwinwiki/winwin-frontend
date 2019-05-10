import {
  FETCH_REGIONSERVED_REQUEST,
  FETCH_REGIONSERVED_SUCCESS,
  FETCH_REGIONSERVED_ERROR,
  SAVE_REGIONSERVED_REQUEST,
  SAVE_REGIONSERVED_SUCCESS,
  SAVE_REGIONSERVED_ERROR,
  REMOVE_REGIONSERVED_SUCCESS,
  FETCH_REGIONSLIST_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONSERVED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_REGIONSERVED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FETCH_REGIONSLIST_SUCCESS:
      return Object.assign({}, state, {
        regionsList: action.response
      });

    case FETCH_REGIONSERVED_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });
    case SAVE_REGIONSERVED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        saveError: false
      });

    case SAVE_REGIONSERVED_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    // add new regions
    case SAVE_REGIONSERVED_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          response: [...state.data.response, action.response.response[0]]
        }
      };

    // NOTE: should not mutate state directly
    case REMOVE_REGIONSERVED_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          response: state.data.response.map(item => {
            if (item.id === action.response) {
              return {
                ...item,
                isActive: false
              };
            }
            return item;
          })
        }
      };

    default:
      return state;
  }
};
