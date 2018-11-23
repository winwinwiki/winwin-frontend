import { FETCH_ORGDETAIL_REQUEST, FETCH_ORGDETAIL_SUCCESS, FETCH_ORGDETAIL_ERROR } from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORGDETAIL_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case FETCH_ORGDETAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FETCH_ORGDETAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};