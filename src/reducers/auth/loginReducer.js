import {SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_FORM_ERROR} from '../../constants/dispatch';

const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  formError: {
    email: '',
    password: ''
  },
  userInfo: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
    case SET_FORM_ERROR:
      let formErrorVal = Object.assign({}, state.formError, action.formError);
      return Object.assign({}, state, {formError: formErrorVal});

    default:
      return state;
  }
};