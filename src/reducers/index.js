import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './auth/loginReducer';
import forgetPassword from './auth/forgetPasswordReducer';
import resetPassword from './auth/resetPasswordReducer';

import createOrg from './createOrg/createOrgReducer';
import orgLanding from './orgLanding/orgLandingReducer';
import orgFilter from './orgLanding/orgFilterReducer';

import spiTags from './orgDetail/spiTagsReducer';
import sdgTags from './orgDetail/sdgTagsReducer';

export default combineReducers({
    routing: routerReducer,
    login,
    forgetPassword,
    resetPassword,
    createOrg,
    orgLanding,
    orgFilter,
    spiTags,
    sdgTags
});