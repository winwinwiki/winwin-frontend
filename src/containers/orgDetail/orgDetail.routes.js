import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import OrgDetail from './';
import OrgDetailPage from './orgDetailPage';
import DataSets from './dataSets';

const OrgDetailRoutes = ({ match }) => (
        <OrgDetail url={match}>
            <Switch>
                <Route exact path={`${match.path}`} component={OrgDetailPage} />
                <Route exact path={`${match.path}/data-sets`} component={DataSets} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;