import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from '../privateRouter';

import UserManagement from './';
import UserList from './userList';
import UploadUsers from './uploadUsers';

const OrgLandingRoutes = (props) => (
    <UserManagement history={props.history} match={props.match}>
        <Switch>
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/user-management" component={UserList} />
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/user-management/upload-users" component={UploadUsers} />
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