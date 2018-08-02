import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import OrgDetail from './';
import OrgDetailPage from './orgDetailPage';
import DataSets from './dataSets';
import SpiTags from './spiTag';
import SdgTags from './sdgTag';
import RegionsServed from './regionsServed';
import programs from './programs';


const OrgDetailRoutes = ({ match }) => (
        <OrgDetail url={match}>
            <Switch>
                <PrivateRoute authenticated={true} exact path={`${match.path}/data-sets`} component={DataSets} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/regions-served`} component={RegionsServed} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/spi-tags`} component={SpiTags} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/sdg-tags`} component={SdgTags} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/programs`} component={programs} />
                <PrivateRoute authenticated={true} orgId={match.params.id} exact path={`${match.path}`} component={OrgDetailPage} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;