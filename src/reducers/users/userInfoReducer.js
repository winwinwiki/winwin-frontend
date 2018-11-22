import { USERINFO_REQUEST, USERINFO_SUCCESS, USERINFO_ERROR } from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERINFO_REQUEST:
      return Object.assign({}, state, {
        loading: false,
        data: null,
        error: false,
      });

    case USERINFO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
      });

    case USERINFO_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true,
      });

    default:
      return state;
  }
};