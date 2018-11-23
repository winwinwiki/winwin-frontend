import { FETCH_SDGTAGS_REQUEST, FETCH_SDGTAGS_SUCCESS, FETCH_SDGTAGS_ERROR } from '../../constants/dispatch';

const initialState = {
  loading: false,
  data: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SDGTAGS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        data: null,
        error: false
      });
    case FETCH_SDGTAGS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        data: action.response,
        error: false
      });
    case FETCH_SDGTAGS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        data: action.error,
        error: true
      });

    default:
      return state;
  }
};