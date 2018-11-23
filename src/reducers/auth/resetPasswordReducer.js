import { RESETPASSWORD_REQUEST, RESETPASSWORD_SUCCESS, RESETPASSWORD_ERROR } from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESETPASSWORD_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });

    case RESETPASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });

    case RESETPASSWORD_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};