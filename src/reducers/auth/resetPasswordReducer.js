import {SET_RESETPASSWORD_SUCCESS, 
        SET_RESETPASSWORD_PENDING, 
        SET_RESETFORM_ERROR, 
        SET_RESETPASSWORD_ERROR} from '../../constants/dispatch';

const initialState = {
  isResetPwdSuccess: false,
  isResetPwdPending: false,
  resetPwdError: null,
  resetFormError: {
    password: '',
    confirmPassword: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESETPASSWORD_PENDING:
      return Object.assign({}, state, {
        isResetPwdPending: action.isResetPwdPending
      });

    case SET_RESETPASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isResetPwdSuccess: action.isResetPwdSuccess
      });

    case SET_RESETPASSWORD_ERROR:
      return Object.assign({}, state, {
        resetPwdError: action.resetPwdError
      });
    case SET_RESETFORM_ERROR:
      let resetFormErrorVal = Object.assign({}, state.resetFormError, action.resetFormError);
      return Object.assign({}, state, {resetFormError: resetFormErrorVal});

    default:
      return state;
  }
};