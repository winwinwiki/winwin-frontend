import React, { Fragment } from "react";
//import { push } from "react-router-redux";
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { onLogin } from "../../../actions/auth/loginAction";
import { fetchUserInfo } from "../../../actions/users/userInfoAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import Header from "../../../containers/header/index";
import UserProfile from "../../userManagement/userProfile";

class KibanaLanding extends React.Component {
  render() {
    const { history, userInfo, location } = this.props;
    return (
      <div className="d-flex flex-column h-100 w-100">
        <Header history={history} />
        <main
          role="main-kustom"
          className="dashboard-container"
          style={{ paddingTop: "67px !important" }}
        >
          <React.Fragment>
            {location && location.pathname.startsWith("/user-management") ? (
              <UserProfile />
            ) : (
              <iframe
                title={
                  userInfo && userInfo.userDisplayName
                    ? `${userInfo.userDisplayName}'s Dashboard`
                    : "Custom Kibana Dashboard"
                }
                src="https://search-winwindev-3bunivyjknlg772kykxnenk4qi.us-west-2.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/d37ff9f0-b44a-11e9-b1d4-4bccfe0423b1?embed=true&_g=()"
                style={{ border: 0, width: "100%", height: "100%" }}
              />
            )}
          </React.Fragment>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  userInfo: state.userInfo,
  location: state.routing.location
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (page, param) => push(page, param),
      onLogin,
      fetchUserInfo,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KibanaLanding);
