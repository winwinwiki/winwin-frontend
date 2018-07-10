import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import OrgLanding from './';
import OrgDetail from '../orgDetail';
import OrgList from './orgList';

const OrgLandingRoutes = () => (
    <OrgLanding>
      <BrowserRouter>
          <Switch>
              <Route exact path="/organizations" component={OrgList} />
              <Route exact path="/organizations/detail" component={OrgDetail} />
          </Switch>
      </BrowserRouter>
    </OrgLanding>
)

export default OrgLandingRoutes;