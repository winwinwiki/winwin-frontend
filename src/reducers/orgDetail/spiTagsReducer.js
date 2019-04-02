import {
  FETCH_SPITAGS_REQUEST,
  FETCH_SPITAGS_SUCCESS,
  FETCH_SPITAGS_ERROR,
  UPDATE_SPIDATA_SUCCESS
} from "../../constants/dispatch";

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPITAGS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_SPITAGS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_SPITAGS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    case UPDATE_SPIDATA_SUCCESS:
      return {
        ...state,
        data: {
          response: action.filteredObj
        }
      };
    default:
      return state;
  }
};
