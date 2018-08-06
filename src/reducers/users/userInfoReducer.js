import { SET_USERINFO_PENDING, SET_USERINFO_SUCCESS, SET_USERINFO_ERROR } from '../../constants/dispatch';

const initialState = {
  isUserInfoSuccess: false,
  isUserInfoPending: false,
  userInfoError: null,
  userInfo: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERINFO_PENDING:
      return Object.assign({}, state, {
        isUserInfoPending: action.isUserInfoPending
      });

    case SET_USERINFO_SUCCESS:
      return Object.assign({}, state, {
        isUserInfoSuccess: action.isUserInfoSuccess,
        userInfo: action.userInfo
      });

    case SET_USERINFO_ERROR:
      return Object.assign({}, state, {
        userInfoError: action.userInfoError
      });

    default:
      return state;
  }
};