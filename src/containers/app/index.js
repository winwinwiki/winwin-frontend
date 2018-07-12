import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRoutes from '../home/home.routes';
import About from '../about';
import OrgLandingRoutes from '../orgLanding/orgLanding.routes';

const App = () => (
    <div className="main-content d-flex container">
     <Switch>
        <Route path="/organizations" component={OrgLandingRoutes} />
        <Route exact path="/about-us" component={About} />
        <Route path="/" component={HomeRoutes} />
      </Switch>
    </div>
)

export default App;