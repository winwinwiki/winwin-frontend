import {SET_CREATEORG_PENDING, SET_CREATEORG_SUCCESS, SET_CREATEORG_ERROR, SET_CREATEORGFORM_ERROR} from '../../constants/dispatch';

const initialState = {
  isCreateOrgSuccess: false,
  isCreateOrgPending: false,
  createOrgError: null,
  createOrgFormError: {
    orgName: '',
    location: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATEORG_PENDING:
      return Object.assign({}, state, {
        isCreateOrgPending: action.isCreateOrgPending
      });

    case SET_CREATEORG_SUCCESS:
      return Object.assign({}, state, {
        isCreateOrgSuccess: action.isCreateOrgSuccess
      });

    case SET_CREATEORG_ERROR:
      return Object.assign({}, state, {
        createOrgError: action.createOrgError
      });
    case SET_CREATEORGFORM_ERROR:
      let formErrorVal = Object.assign({}, state.createOrgFormError, action.createOrgFormError);
      return Object.assign({}, state, {createOrgFormError: formErrorVal});

    default:
      return state;
  }
};