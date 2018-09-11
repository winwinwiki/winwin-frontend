import { SET_FETCHUSER_PENDING, SET_FETCHUSER_SUCCESS, SET_FETCHUSER_ERROR } from '../../constants/dispatch';

const initialState = {
    isFetchUserPending: false,
    isFetchUserSuccess: false,
    fetchUserError: null,
    userList: []
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FETCHUSER_PENDING:
        return Object.assign({}, state, {
            isFetchUserPending: action.isFetchUserPending
        });
  
      case SET_FETCHUSER_SUCCESS:
        let userListWithSelect = action.userList.map(user => {user['select'] = false; return user;});
        return Object.assign({}, state, {
            isFetchUserSuccess: action.isFetchUserSuccess,
            userList: userListWithSelect
        });
  
      case SET_FETCHUSER_ERROR:
        return Object.assign({}, state, {
            fetchUserError: action.fetchUserError
        });
  
      default:
        return state;
    }
  };