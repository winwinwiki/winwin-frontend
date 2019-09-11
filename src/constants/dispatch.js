//loading
export const LOADER_START = "loader/LOADER_START";
export const LOADER_STOP = "loader/LOADER_STOP";
//notifications
export const ADD_NOTIFICATION = "notifications/ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "notifications/REMOVE_NOTIFICATION";

//set refresh token
export const SET_REFRESH_TOKEN_REQUEST = "auth/SET_REFRESH_TOKEN_REQUEST";
export const SET_REFRESH_TOKEN_SUCCESS = "auth/SET_REFRESH_TOKEN_SUCCESS";
export const SET_REFRESH_TOKEN_ERROR = "auth/SET_REFRESH_TOKEN_ERROR";

export const REFRESHING_TOKEN = "auth/REFRESHING_TOKEN";
export const DONE_REFRESHING_TOKEN = "auth/DONE_REFRESHING_TOKEN";

//login
export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "auth/LOGIN_ERROR";
export const SET_FORM_ERROR = "auth/SET_FORM_ERROR";
export const LOAD_USER_FROM_STORAGE = "auth/LOAD_USER_FROM_STORAGE";
export const LOGOUT = "auth/LOGOUT";
//reset password
export const RESETPASSWORD_REQUEST = "auth/RESETPASSWORD_REQUEST";
export const RESETPASSWORD_SUCCESS = "auth/RESETPASSWORD_SUCCESS";
export const RESETPASSWORD_ERROR = "auth/RESETPASSWORD_ERROR";
//change password
export const CHANGEPASSWORD_REQUEST = "auth/CHANGEPASSWORD_REQUEST";
export const CHANGEPASSWORD_SUCCESS = "auth/CHANGEPASSWORD_SUCCESS";
export const CHANGEPASSWORD_ERROR = "auth/CHANGEPASSWORD_ERROR";
//forget password
export const FP_REQUEST = "auth/FP_REQUEST";
export const FP_SUCCESS = "auth/FP_SUCCESS";
export const FP_ERROR = "auth/FP_ERROR";
//users
export const USERINFO_REQUEST = "user/USERINFO_REQUEST";
export const USERINFO_SUCCESS = "user/USERINFO_SUCCESS";
export const USERINFO_ERROR = "user/USERINFO_ERROR";
export const LOGGED_IN_USERINFO_REQUEST = "user/LOGGED_IN_USERINFO_REQUEST";
export const LOGGED_IN_USERINFO_SUCCESS = "user/LOGGED_IN_USERINFO_SUCCESS";
export const LOGGED_IN_USERINFO_ERROR = "user/LOGGED_IN_USERINFO_ERROR";
//create org
export const CREATEORG_REQUEST = "org/CREATEORG_REQUEST";
export const CREATEORG_SUCCESS = "org/CREATEORG_SUCCESS";
export const CREATEORG_ERROR = "org/CREATEORG_ERROR";

//delete org
export const DELETEORG_REQUEST = "org/DELETEORG_REQUEST";
export const DELETEORG_SUCCESS = "org/DELETEORG_SUCCESS";
export const DELETEORG_ERROR = "org/DELETEORG_ERROR";

//create user
export const CREATEUSER_REQUEST = "org/CREATEUSER_REQUEST";
export const CREATEUSER_SUCCESS = "org/CREATEUSER_SUCCESS";
export const CREATEUSER_ERROR = "org/CREATEUSER_ERROR";

//DELETE user
export const DELETE_USER_REQUEST = "org/DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "org/DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "org/DELETE_USER_ERROR";

//save user info
export const SAVEUSERINFO_REQUEST = "user/SAVEUSERINFO_REQUEST";
export const SAVEUSERINFO_SUCCESS = "user/SAVEUSERINFO_SUCCESS";
export const SAVEUSERINFO_ERROR = "user/SAVEUSERINFO_ERROR";

//update user active state
export const UPDATE_USER_ACTIVE_STATE_REQUEST = "user/UPDATE_USER_ACTIVE_STATE_REQUEST";
export const UPDATE_USER_ACTIVE_STATE_SUCCESS = "user/UPDATE_USER_ACTIVE_STATE_SUCCESS";
export const UPDATE_USER_ACTIVE_STATE_ERROR = "user/UPDATE_USER_ACTIVE_STATE_ERROR";

//org landing
export const FETCHORG_REQUEST = "org/FETCHORG_REQUEST";
export const FETCHORG_SUCCESS = "org/FETCHORG_SUCCESS";
export const FECTHORG_ERROR = "org/FECTHORG_ERROR";
export const FETCH_PROG_REQUEST = "org/FETCH_PROG_REQUEST";
export const FETCH_PROG_SUCCESS = "org/FETCH_PROG_SUCCESS";
export const FETCH_PROG_ERROR = "org/FETCH_PROG_ERROR";
export const SET_SDGLIST_REQUEST = "org/SET_SDGLIST_REQUEST";
export const SET_SDGLIST_SUCCESS = "org/SET_SDGLIST_SUCCESS";
export const SET_SDGLIST_ERROR = "org/SET_SDGLIST_ERROR";
export const SET_SPILIST_REQUEST = "org/SET_SPILIST_REQUEST";
export const SET_SPILIST_SUCCESS = "org/SET_SPILIST_SUCCESS";
export const SET_SPILIST_ERROR = "org/SET_SPILIST_ERROR";
export const SET_APPLIED_FILTER = "org/SET_APPLIED_FILTER";
export const SET_FILTERS = "org/SET_FILTERS";
//org detail
export const FETCH_ORGDETAIL_REQUEST = "org/FETCH_ORGDETAIL_REQUEST";
export const FETCH_ORGDETAIL_SUCCESS = "org/FETCH_ORGDETAIL_SUCCESS";
export const FETCH_ORGDETAIL_ERROR = "org/FETCH_ORGDETAIL_ERROR";

//prog detail
export const SAVE_PROG_REQUEST = "org/SAVE_PROG_REQUEST";
export const SAVE_PROG_SUCCESS = "org/SAVE_PROG_SUCCESS";
export const SAVE_PROG_ERROR = "org/SAVE_PROG_ERROR";

//save basic org detail
export const SAVE_ORGDETAIL_BASIC_INFO_REQUEST =
  "org/SAVE_ORGDETAIL_BASIC_INFO_REQUEST";
export const SAVE_ORGDETAIL_BASIC_INFO_SUCCESS =
  "org/SAVE_ORGDETAIL_BASIC_INFO_SUCCESS";
export const SAVE_ORGDETAIL_BASIC_INFO_ERROR =
  "org/SAVE_ORGDETAIL_BASIC_INFO_ERROR";

// data sets
export const FETCH_DATASET_REQUEST = "org/FETCH_DATASET_REQUEST";
export const FETCH_DATASET_SUCCESS = "org/FETCH_DATASET_SUCCESS";
export const FETCH_DATASET_ERROR = "org/FETCH_DATASET_ERROR";
export const SAVE_DATASET_REQUEST = "org/SAVE_DATASET_REQUEST";
export const SAVE_DATASET_SUCCESS = "org/SAVE_DATASET_SUCCESS";
export const SAVE_DATASET_ERROR = "org/SAVE_DATASET_ERROR";
export const FETCH_PROG_DATASET_REQUEST = "org/FETCH_PROG_DATASET_REQUEST";
export const FETCH_PROG_DATASET_SUCCESS = "org/FETCH_PROG_DATASET_SUCCESS";
export const FETCH_PROG_DATASET_ERROR = "org/FETCH_PROG_DATASET_ERROR";
export const SAVE_PROG_DATASET_REQUEST = "org/SAVE_PROG_DATASET_REQUEST";
export const SAVE_PROG_DATASET_SUCCESS = "org/SAVE_PROG_DATASET_SUCCESS";
export const SAVE_PROG_DATASET_ERROR = "org/SAVE_PROG_DATASET_ERROR";

//delete data sets
export const DELETE_DATASET_REQUEST = "org/DELETE_DATASET_REQUEST";
export const DELETE_DATASET_SUCCESS = "org/DELETE_DATASET_SUCCESS";
export const DELETE_DATASET_ERROR = "org/DELETE_DATASET_ERROR";
export const DELETE_PROG_DATASET_REQUEST = "org/DELETE_PROG_DATASET_REQUEST";
export const DELETE_PROG_DATASET_SUCCESS = "org/DELETE_PROG_DATASET_SUCCESS";
export const DELETE_PROG_DATASET_ERROR = "org/DELETE_PROG_DATASET_ERROR";

//data sets categories
export const FETCH_DATASET_CATEGORIES_REQUEST =
  "org/FETCH_DATASET_CATEGORIES_REQUEST";
export const FETCH_DATASET_CATEGORIES_SUCCESS =
  "org/FETCH_DATASET_CATEGORIES_SUCCESS";
export const FETCH_DATASET_CATEGORIES_ERROR =
  "org/FETCH_DATASET_CATEGORIES_ERROR";
export const FETCH_PROG_DATASET_CATEGORIES_REQUEST =
  "org/FETCH_PROG_DATASET_CATEGORIES_REQUEST";
export const FETCH_PROG_DATASET_CATEGORIES_SUCCESS =
  "org/FETCH_PROG_DATASET_CATEGORIES_SUCCESS";
export const FETCH_PROG_DATASET_CATEGORIES_ERROR =
  "org/FETCH_PROG_DATASET_CATEGORIES_ERROR";

//resource categories
export const FETCH_RESOURCE_CATEGORIES_REQUEST =
  "org/FETCH_RESOURCE_CATEGORIES_REQUEST";
export const FETCH_RESOURCE_CATEGORIES_SUCCESS =
  "org/FETCH_RESOURCE_CATEGORIES_SUCCESS";
export const FETCH_RESOURCE_CATEGORIES_ERROR =
  "org/FETCH_RESOURCE_CATEGORIES_ERROR";
export const SAVE_RESOURCE_CATEGORIES_REQUEST =
  "org/SAVE_RESOURCE_CATEGORIES_REQUEST";
export const SAVE_RESOURCE_CATEGORIES_SUCCESS =
  "org/SAVE_RESOURCE_CATEGORIES_SUCCESS";
export const SAVE_RESOURCE_CATEGORIES_ERROR =
  "org/SAVE_RESOURCE_CATEGORIES_ERROR";
export const FETCH_PROG_RESOURCE_CATEGORIES_REQUEST =
  "org/FETCH_PROG_RESOURCE_CATEGORIES_REQUEST";
export const FETCH_PROG_RESOURCE_CATEGORIES_SUCCESS =
  "org/FETCH_PROG_RESOURCE_CATEGORIES_SUCCESS";
export const FETCH_PROG_RESOURCE_CATEGORIES_ERROR =
  "org/FETCH_PROG_RESOURCE_CATEGORIES_ERROR";
export const SAVE_PROG_RESOURCE_CATEGORIES_REQUEST =
  "org/SAVE_PROG_RESOURCE_CATEGORIES_REQUEST";
export const SAVE_PROG_RESOURCE_CATEGORIES_SUCCESS =
  "org/SAVE_PROG_RESOURCE_CATEGORIES_SUCCESS";
export const SAVE_PROG_RESOURCE_CATEGORIES_ERROR =
  "org/SAVE_PROG_RESOURCE_CATEGORIES_ERROR";

//resources
export const FETCH_RESOURCES_REQUEST = "org/FETCH_RESOURCES_REQUEST";
export const FETCH_RESOURCES_SUCCESS = "org/FETCH_RESOURCES_SUCCESS";
export const FETCH_RESOURCES_ERROR = "org/FETCH_RESOURCES_ERROR";
export const SAVE_RESOURCES_REQUEST = "org/SAVE_RESOURCES_REQUEST";
export const SAVE_RESOURCES_SUCCESS = "org/SAVE_RESOURCES_SUCCESS";
export const SAVE_RESOURCES_ERROR = "org/SAVE_RESOURCES_ERROR";
export const DELETE_RESOURCE_REQUEST = "org/DELETE_RESOURCE_REQUEST";
export const DELETE_RESOURCE_SUCCESS = "org/DELETE_RESOURCE_SUCCESS";
export const DELETE_RESOURCE_ERROR = "org/DELETE_RESOURCE_ERROR";
//regions served
export const FETCH_REGIONSERVED_REQUEST = "org/FETCH_REGIONSERVED_REQUEST";
export const FETCH_REGIONSERVED_SUCCESS = "org/FETCH_REGIONSERVED_SUCCESS";
export const FETCH_REGIONSERVED_ERROR = "org/FETCH_REGIONSERVED_ERROR";
export const SAVE_REGIONSERVED_REQUEST = "org/SAVE_REGIONSERVED_REQUEST";
export const SAVE_REGIONSERVED_SUCCESS = "org/SAVE_REGIONSERVED_SUCCESS";
export const SAVE_REGIONSERVED_ERROR = "org/SAVE_REGIONSERVED_ERROR";
export const REMOVE_REGIONSERVED_REQUEST = "org/REMOVE_REGIONSERVED_REQUEST";
export const REMOVE_REGIONSERVED_SUCCESS = "org/REMOVE_REGIONSERVED_SUCCESS";
export const REMOVE_REGIONSERVED_ERROR = "org/REMOVE_REGIONSERVED_ERROR";
export const RESET_REGIONSERVED_SUCCESS = "org/RESET_REGIONSERVED_SUCCESS";
export const RESET_REGIONSERVED_ERROR = "org/RESET_REGIONSERVED_ERROR";
export const UPDATE_REGIONSERVED_SUCCESS = "org/UPDATE_REGIONSERVED_SUCCESS";
export const UPDATE_REGIONSERVED_ERROR = "org/UPDATE_REGIONSERVED_ERROR";
//spi tags
export const FETCH_SPITAGS_REQUEST = "org/FETCH_SPITAGS_REQUEST";
export const FETCH_SPITAGS_SUCCESS = "org/FETCH_SPITAGS_SUCCESS";
export const FETCH_SPITAGS_ERROR = "org/FETCH_SPITAGS_ERROR";
export const UPDATE_SPIDATA_REQUEST = "org/UPDATE_SPIDATA_REQUEST";
export const UPDATE_SPIDATA_SUCCESS = "org/UPDATE_SPIDATA_SUCCESS";
export const UPDATE_SPIDATA_ERROR = "org/UPDATE_SPIDATA_ERROR";
export const FILTER_SPITAGS_LIST_SUCCESS = "org/FILTER_SPITAGS_LIST_SUCCESS";
export const FILTER_SPITAGS_LIST_ERROR = "org/FILTER_SPITAGS_LIST_ERROR";
//sdg tags
export const FETCH_SDGTAGS_REQUEST = "org/FETCH_SDGTAGS_REQUEST";
export const FETCH_SDGTAGS_SUCCESS = "org/FETCH_SDGTAGS_SUCCESS";
export const FETCH_SDGTAGS_ERROR = "org/FETCH_SDGTAGS_ERROR";
export const UPDATE_SDGDATA_REQUEST = "org/UPDATE_SDGDATA_REQUEST";
export const UPDATE_SDGDATA_SUCCESS = "org/UPDATE_SDGDATA_SUCCESS";
export const UPDATE_SDGDATA_ERROR = "org/UPDATE_SDGDATA_ERROR";
export const FILTER_SDGTAGS_LIST_SUCCESS = "org/FILTER_SDGTAGS_LIST_SUCCESS";
export const FILTER_SDGTAGS_LIST_ERROR = "org/FILTER_SDGTAGS_LIST_ERROR";
//prog detail
export const FETCH_PROGDETAIL_REQUEST = "org/FETCH_PROGDETAIL_REQUEST";
export const FETCH_PROGDETAIL_SUCCESS = "org/FETCH_PROGDETAIL_SUCCESS";
export const FECTH_PROGDETAIL_ERROR = "org/FECTH_PROGDETAIL_ERROR";
//program list
export const SET_FETCHPROGRAM_PENDING = "program/SET_FETCHPROGRAM_PENDING";
export const SET_FETCHPROGRAM_SUCCESS = "program/SET_FETCHPROGRAM_SUCCESS";
export const SET_FECTHPROGRAM_ERROR = "program/SET_FECTHPROGRAM_ERROR";

//add program
export const ADD_PROGRAM_REQUEST = "program/ADD_PROGRAM_REQUEST";
export const ADD_PROGRAM_SUCCESS = "program/ADD_PROGRAM_SUCCESS";
export const ADD_PROGRAM_ERROR = "program/ADD_PROGRAM_ERROR";

//delete program
export const DELETE_PROGRAM_REQUEST = "program/DELETE_PROGRAM_REQUEST";
export const DELETE_PROGRAM_SUCCESS = "program/DELETE_PROGRAM_SUCCESS";
export const DELETE_PROGRAM_ERROR = "program/DELETE_PROGRAM_ERROR";

//Data Feed
export const DATA_FEED_REQUEST = "org/DATA_FEED_REQUEST";
export const DATA_FEED_SUCCESS = "org/DATA_FEED_SUCCESS";
export const DATA_FEED_ERROR = "org/DATA_FEED_ERROR";
//Org History
export const SET_FETCHORGHISTORY_PENDING = "org/SET_FETCHORGHISTORY_PENDING";
export const SET_FETCHORGHISTORY_SUCCESS = "org/SET_FETCHORGHISTORY_SUCCESS";
export const SET_FECTHORGHISTORY_ERROR = "org/SET_FECTHORGHISTORY_ERROR";
//Org Hierarchy
export const SET_FETCHORGHEIRARCHY_PENDING =
  "org/SET_FETCHORGHEIRARCHY_PENDING";
export const SET_FETCHORGHEIRARCHY_SUCCESS =
  "org/SET_FETCHORGHEIRARCHY_SUCCESS";
export const SET_FECTHORGHEIRARCHY_ERROR = "org/SET_FECTHORGHEIRARCHY_ERROR";
//User Management List
export const SET_FETCHUSER_PENDING = "userManagmenet/SET_FETCHUSER_PENDING";
export const SET_FETCHUSER_SUCCESS = "userManagmenet/SET_FETCHUSER_SUCCESS";
export const SET_FETCHUSER_ERROR = "userManagmenet/SET_FETCHUSER_ERROR";
//Notes
export const FETCH_NOTES_PENDING = "org/FETCH_NOTES_PENDING";
export const FETCH_NOTES_SUCCESS = "org/FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_ERROR = "org/FETCH_NOTES_ERROR";
export const SAVE_NOTES_REQ = "org/SAVE_NOTES_REQ";
export const SAVE_NOTES_SUCCESS = "org/SAVE_NOTES_SUCCESS";
export const SAVE_NOTES_ERROR = "org/SAVE_NOTES_ERROR";
export const DELETE_NOTES_PENDING = "org/DELETE_NOTES_PENDING";
export const DELETE_NOTES_SUCCESS = "org/DELETE_NOTES_SUCCESS";
export const DELETE_NOTES_ERROR = "org/DELETE_NOTES_ERROR";
export const UPDATE_NOTES_PENDING = "org/UPDATE_NOTES_PENDING";
export const UPDATE_NOTES_SUCCESS = "org/UPDATE_NOTES_SUCCESS";
export const UPDATE_NOTES_ERROR = "org/UPDATE_NOTES_ERROR";

//org chart
export const ADD_ORG_CHART_CHILD_REQUEST = "org/ADD_ORG_CHART_CHILD_REQUEST";
export const ADD_ORG_CHART_CHILD_SUCCESS = "org/ADD_ORG_CHART_CHILD_SUCCESS";
export const ADD_ORG_CHART_CHILD_ERROR = "org/ADD_ORG_CHART_CHILD_ERROR";

export const RESET_ORGHIRARCHY_SUCCESS = "org/RESET_ORGHIRARCHY_SUCCESS";
export const RESET_ORGHIRARCHY_ERROR = "org/RESET_ORGHIRARCHY_ERROR";

//REGIONS LIST
export const FETCH_REGIONSLIST_REQUEST = "org/FETCH_REGIONSLIST_REQUEST";
export const FETCH_REGIONSLIST_SUCCESS = "org/FETCH_REGIONSLIST_SUCCESS";
export const FETCH_REGIONSLIST_ERROR = "org/FETCH_REGIONSLIST_ERROR";

//NAICS LIST
export const FETCH_NAICS_LIST_REQUEST = "org/FETCH_NAICS_LIST_REQUEST";
export const FETCH_NAICS_LIST_SUCCESS = "org/FETCH_NAICS_LIST_SUCCESS";
export const FETCH_NAICS_LIST_ERROR = "org/FETCH_NAICS_LIST_ERROR";

//NTEE LIST
export const FETCH_NTEE_LIST_REQUEST = "org/FETCH_NTEE_LIST_REQUEST";
export const FETCH_NTEE_LIST_SUCCESS = "org/FETCH_NTEE_LIST_SUCCESS";
export const FETCH_NTEE_LIST_ERROR = "org/FETCH_NTEE_LIST_ERROR";

//FILTER PROGRAMS LIST
export const FILTER_PROG_REQUEST = "org/FILTER_PROG_REQUEST";
export const FILTER_PROG_SUCCESS = "org/FILTER_PROG_SUCCESS";
export const FILTER_PROG_ERROR = "org/FILTER_PROG_ERROR";

//RESET PROGRAMS LIST
export const RESET_PROGRAMLIST_SUCCESS = "org/RESET_PROGRAMLIST_SUCCESS";
export const RESET_PROGRAMLIST_ERROR = "org/RESET_PROGRAMLIST_ERROR";

//BULK ORG CREATE
export const CREATE_BULK_ORG_REQUEST = "org/CREATE_BULK_ORG_REQUEST";
export const CREATE_BULK_ORG_SUCCESS = "org/CREATE_BULK_ORG_SUCCESS";
export const CREATE_BULK_ORG_ERROR = "org/CREATE_BULK_ORG_ERROR";

//ORG CHART DELETE
export const DELETEORGCHART_REQUEST = "org/DELETEORGCHART_REQUEST";
export const DELETEORGCHART_SUCCESS = "org/DELETEORGCHART_SUCCESS";
export const DELETEORGCHART_ERROR = "org/DELETEORGCHART_ERROR";

//create kibana user
export const CREATE_KIBANA_USER_REQUEST = "org/CREATE_KIBANA_USER_REQUEST";
export const CREATE_KIBANA_USER_SUCCESS = "org/CREATE_KIBANA_USER_SUCCESS";
export const CREATE_KIBANA_USER_ERROR = "org/CREATE_KIBANA_USER_ERROR";

//publish to kibana
export const PUBLISH_TO_KIBANA_REQUEST = "org/PUBLISH_TO_KIBANA_REQUEST";
export const PUBLISH_TO_KIBANA_SUCCESS = "org/PUBLISH_TO_KIBANA_SUCCESS";
export const PUBLISH_TO_KIBANA_ERROR = "org/PUBLISH_TO_KIBANA_ERROR";
