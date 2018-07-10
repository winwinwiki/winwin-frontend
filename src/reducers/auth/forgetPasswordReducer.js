import {SET_FP_PENDING, SET_FP_SUCCESS, SET_FP_ERROR, SET_FPFORM_ERROR} from '../../constants/dispatch';

const initialState = {
  isFpSuccess: false,
  isFpPending: false,
  fpError: null,
  fpFormError: {
    email: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FP_PENDING:
      return Object.assign({}, state, {
        isFpSuccess: action.isFpSuccess
      });

    case SET_FP_SUCCESS:
      return Object.assign({}, state, {
        isFpSuccess: action.isFpSuccess
      });

    case SET_FP_ERROR:
      return Object.assign({}, state, {
        fpError: action.fpError
      });
    case SET_FPFORM_ERROR:
      let formErrorVal = Object.assign({}, state.fpFormError, action.fpFormError);
      return Object.assign({}, state, {fpFormError: formErrorVal});

    default:
      return state;
  }
};