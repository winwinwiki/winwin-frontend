import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './auth/loginReducer';
import forgetPassword from './auth/forgetPasswordReducer';
import resetPassword from './auth/resetPasswordReducer';

import userInfo from './users/userInfoReducer';

import sectionHeader from './sectionHeader/sectionHeaderReducer';

import createOrg from './createOrg/createOrgReducer';
import dataFeed from './dataFeed/dataFeedReducer';
import orgLanding from './orgLanding/orgLandingReducer';
import orgFilter from './orgLanding/orgFilterReducer';

import spiTags from './orgDetail/spiTagsReducer';
import sdgTags from './orgDetail/sdgTagsReducer';
import regionsServed from './orgDetail/regionsServedReducer';
import resources from './orgDetail/resourcesReducer';
import dataset from './orgDetail/dataSetReducer';
import orgHistory from './orgDetail/orgHistoryReducer';
import orgDetail from './orgDetail/orgDetailReducer';
import programDetail from './program/programDetailReducer';
import orgChart from './orgDetail/orgChartReducer';
import programList from './program/programListReducer';

export default combineReducers({
    routing: routerReducer,
    login,
    forgetPassword,
    resetPassword,
    createOrg,
    dataFeed,
    orgLanding,
    orgFilter,
    spiTags,
    sdgTags,
    regionsServed,
    resources,
    dataset,
    orgDetail,
    programDetail,
    programList,
    userInfo,
    sectionHeader,
    orgHistory,
    orgChart
});