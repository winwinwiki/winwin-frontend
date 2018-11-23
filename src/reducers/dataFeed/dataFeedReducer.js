import { DATA_FEED_REQUEST, DATA_FEED_SUCCESS, DATA_FEED_ERROR } from '../../constants/dispatch';
const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_FEED_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case DATA_FEED_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case DATA_FEED_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};