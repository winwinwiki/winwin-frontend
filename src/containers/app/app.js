import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './index';
import AuthRoutes from '../auth/auth.routes';
import OrgLandingRoutes from '../orgLanding/orgLanding.routes';
import UserManagementRoutes from '../userManagement/userManagement.routes';

const AppRoutes = (props) => (
    <App history={props.history} match={props.match}>
        <Switch>
            <Route path="/organizations" component={OrgLandingRoutes} />
            <Route path="/user-management" component={UserManagementRoutes} />
            <Route path="/change-password" component={UserManagementRoutes} />
            <Route path="/my-profile" component={UserManagementRoutes} />
            <Route path="/" component={AuthRoutes} />
        </Switch>
    </App>
);


export default AppRoutes;