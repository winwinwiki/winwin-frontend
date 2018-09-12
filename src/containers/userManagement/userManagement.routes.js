import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from '../privateRouter';

import UserManagement from './';
import UserList from './userList';
import UserProfile from './userProfile';
import ChangePassword from '../auth/changePassword';

const OrgLandingRoutes = (props) => (
    <UserManagement history={props.history} match={props.match}>
        <Switch>
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/user-management" component={UserList} />
            <PrivateRoute authenticated={props.isAuthenticated} path="/change-password" component={ChangePassword} />
            <PrivateRoute authenticated={props.isAuthenticated} path="/user-management/:id" component={UserProfile} />
            <PrivateRoute authenticated={props.isAuthenticated} path="/my-profile/:id" component={UserProfile} />
        </Switch>
    </UserManagement>
)

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(OrgLandingRoutes);