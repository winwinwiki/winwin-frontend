import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import OrgDetail from './';
import OrgDetailPage from './orgDetailPage';
import DataSets from './dataSets';

const OrgDetailRoutes = ({ match }) => (
        <OrgDetail url={match}>
            <Switch>
                <PrivateRoute authenticated={true} exact path={`${match.path}`} component={OrgDetailPage} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/data-sets`} component={DataSets} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;