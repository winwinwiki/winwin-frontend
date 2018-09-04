import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from '../privateRouter';

import OrgLanding from './';
import OrgDetailRoutes from '../orgDetail/orgDetail.routes';
import OrgList from './orgList';
import CreateOrg from '../createOrg';
import UploadDataFeed from '../uploadDataFeed';
import UserManagement from '../userManagement';

import ProgramDetailRoutes from '../programDetail/programDetail.routes';

const OrgLandingRoutes = (props) => (
    <OrgLanding history={props.history} match={props.match}>
        <Switch>
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/user-management" component={UserManagement} />
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/organizations" component={OrgList} />
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/organizations/new" component={CreateOrg} />
            <PrivateRoute authenticated={props.isAuthenticated} exact path="/organizations/uploadDataFeed" component={UploadDataFeed} />
            <PrivateRoute authenticated={props.isAuthenticated} path="/organizations/:id/programs/:programId" component={ProgramDetailRoutes} />
            <PrivateRoute authenticated={props.isAuthenticated} path="/organizations/:id" component={OrgDetailRoutes} />
        </Switch>
    </OrgLanding>
)

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(OrgLandingRoutes);