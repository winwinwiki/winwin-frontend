import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthRoutes from '../auth/auth.routes';
import OrgLandingRoutes from '../orgLanding/orgLanding.routes';
import UserManagementRoutes from '../userManagement/userManagement.routes';

const App = () => (
    <div className="main-content d-flex container">
     <Switch>
        <Route path="/organizations" component={OrgLandingRoutes} />
        <Route path="/user-management" component={UserManagementRoutes} />
        <Route path="/change-password" component={UserManagementRoutes} />
        <Route path="/my-profile" component={UserManagementRoutes} />
        <Route path="/" component={AuthRoutes} />
      </Switch>
    </div>
)

export default App;