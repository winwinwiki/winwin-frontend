import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import loader from "./common/loaderReducer";

import login from "./auth/loginReducer";
import forgetPassword from "./auth/forgetPasswordReducer";
import resetPassword from "./auth/resetPasswordReducer";
import changePassword from "./auth/changePasswordReducer";

import userInfo from "./users/userInfoReducer";

import createOrg from "./createOrg/createOrgReducer";
import dataFeed from "./dataFeed/dataFeedReducer";
import orgLanding from "./orgLanding/orgLandingReducer";

import spiTags from "./orgDetail/spiTagsReducer";
import sdgTags from "./orgDetail/sdgTagsReducer";
import regionsServed from "./orgDetail/regionsServedReducer";
import resources from "./orgDetail/resourcesReducer";
import dataset from "./orgDetail/dataSetReducer";
import orgHistory from "./orgDetail/orgHistoryReducer";
import orgDetail from "./orgDetail/orgDetailReducer";
import programDetail from "./program/programDetailReducer";
import orgChart from "./orgDetail/orgChartReducer";
import programList from "./program/programListReducer";
import userManagement from "./userManagement/userListReducer";
import notes from "./orgDetail/notesReducer";

export default combineReducers({
  routing: routerReducer,
  loader,
  session: login,
  forgetPassword,
  resetPassword,
  changePassword,
  createOrg,
  dataFeed,
  orgList: orgLanding,
  spiTags,
  sdgTags,
  regionsServed,
  resources,
  dataset,
  orgDetail,
  programDetail,
  programList,
  userInfo,
  orgHistory,
  orgChart,
  userManagement,
  notes
});
