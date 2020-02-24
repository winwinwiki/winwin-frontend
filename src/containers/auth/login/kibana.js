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
import { REACT_APP_KIBANA_DASHBOARD_URL } from "../../../buildConfig/apiConfig";

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
                <div>
                  <p className="align-middle text-center mt-3 lead">You are not authorized to access the admin console. Please login to <mark><a href={REACT_APP_KIBANA_DASHBOARD_URL}>NewImpact Wiki</a></mark>.</p>
                </div>
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
  location: state.router.location
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
