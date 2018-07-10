import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './auth/loginReducer';
import forgetPassword from './auth/forgetPasswordReducer';
import resetPassword from './auth/resetPasswordReducer';

export default combineReducers({
    routing: routerReducer,
    login,
    forgetPassword,
    resetPassword
});