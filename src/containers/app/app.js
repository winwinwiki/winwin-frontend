import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./index";
import CrumbRoute from "../common/crumbRoute";
import AuthRoutes from "../auth/auth.routes";
import OrgLandingRoutes from "../orgLanding/orgLanding.routes";
import UserManagementRoutes from "../userManagement/userManagement.routes";

const AppRoutes = props => (
  <App history={props.history} match={props.match}>
    <Switch>
      <CrumbRoute
        title="Organization Management"
        path="/organizations"
        component={OrgLandingRoutes}
      />
      <CrumbRoute
        title="User Management"
        path="/user-management"
        component={UserManagementRoutes}
      />
      <CrumbRoute
        title="Change Password"
        path="/change-password"
        component={UserManagementRoutes}
      />
      <CrumbRoute
        title="User Details"
        path="/my-profile"
        component={UserManagementRoutes}
      />
      <Route path="/" component={AuthRoutes} />
    </Switch>
  </App>
);

export default AppRoutes;
