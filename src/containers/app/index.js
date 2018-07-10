import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRoutes from '../home/home.routes';
import About from '../about';
import OrgLandingRoutes from '../orgLanding/orgLanding.routes';

const App = () => (
     <Switch>
        <Route path="/organizations" component={OrgLandingRoutes} />
        <Route exact path="/about-us" component={About} />
        <Route path="/" component={HomeRoutes} />
      </Switch>
)

export default App;