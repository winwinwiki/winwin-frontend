import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./index";
import CrumbRoute from "../common/crumbRoute";
import AuthRoutes from "../auth/auth.routes";
import OrgLandingRoutes from "../orgLanding/orgLanding.routes";
import UserManagementRoutes from "../userManagement/userManagement.routes";
import KibanaLanding from "../auth/login/kibana";
import { connect } from "react-redux";

const AppRoutes = ({ userInfo, location, ...props }) => (
  <App history={props.history} match={props.match}>
    <Switch>
      {userInfo &&
        userInfo.role === "Reader" &&
        !location.pathname.startsWith("/user-management") && (
          <CrumbRoute
            title="Wiki Dashboard"
            path="/"
            component={KibanaLanding}
          />
        )}

      <CrumbRoute
        title="Organization Management"
        path="/organizations"
        component={OrgLandingRoutes}
      />
      <CrumbRoute
        title={
          userInfo && userInfo.role === "Reader" ? "Kibana" : "User Management"
        }
        path="/user-management"
        component={UserManagementRoutes}
      />
      <CrumbRoute
        title="Change Password"
        path="/change-password"
        component={UserManagementRoutes}
      />
      <Route path="/" component={AuthRoutes} />
    </Switch>
  </App>
);

const mapStateToProps = state => ({
  userInfo: state.session.user,
  location: state.routing.location
});

export default connect(mapStateToProps)(AppRoutes);
