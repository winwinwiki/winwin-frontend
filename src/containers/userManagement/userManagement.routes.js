import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router";
import PrivateRoute from "../privateRouter";
import CrumbRoute from "../common/crumbRoute";
import UserManagement from "./";
import UserList from "./userList";
import UserProfile from "./userProfile";
import ChangePassword from "../auth/changePassword";
import CreateUser from "../createUser";

const OrgLandingRoutes = props => (
  <UserManagement history={props.history} match={props.match}>
    <Switch>
      <PrivateRoute
        title="User Management"
        authenticated={props.isAuthenticated}
        exact
        path="/user-management"
        perform="users:list"
        component={UserList}
      />
      <PrivateRoute
        title="Change Password"
        authenticated={props.isAuthenticated}
        path="/change-password"
        perform="users:changePassword"
        component={ChangePassword}
      />
      <CrumbRoute
        title="New User"
        path="/user-management/new"
        perform="users:create"
        component={CreateUser}
      />
      <CrumbRoute
        title="User Details"
        path="/user-management/:id"
        perform="users:getSelf"
        component={UserProfile}
      />
    </Switch>
  </UserManagement>
);

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(OrgLandingRoutes);
