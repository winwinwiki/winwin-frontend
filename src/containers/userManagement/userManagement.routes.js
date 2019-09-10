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
import NotificationToaster from "../ui/notificationToaster";
import IdleTimer from "react-idle-timer";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/auth/loginAction";

const UserManagementRoutes = props => (
  <UserManagement history={props.history} match={props.match}>
    <NotificationToaster />
    <IdleTimer
      onIdle={() => props.logout()}
      debounce={250}
      timeout={1000 * 60 * 60 * 2} //2 hours timeout
    />
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

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementRoutes);
