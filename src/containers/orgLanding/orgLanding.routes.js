import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import OrgLanding from './';
import OrgDetailRoutes from '../orgDetail/orgDetail.routes';
import OrgList from './orgList';
import CreateOrg from '../createOrg';

const OrgLandingRoutes = () => (
    <OrgLanding>
      <BrowserRouter>
          <Switch>
              <Route exact path="/organizations" component={OrgList} />
              <Route exact path="/organizations/new" component={CreateOrg} />
              <Route path="/organizations/:id" component={OrgDetailRoutes} />
          </Switch>
      </BrowserRouter>
    </OrgLanding>
)

export default OrgLandingRoutes;