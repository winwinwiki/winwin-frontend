import { FP_REQUEST, FP_SUCCESS, FP_ERROR } from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FP_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case FP_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case FP_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};