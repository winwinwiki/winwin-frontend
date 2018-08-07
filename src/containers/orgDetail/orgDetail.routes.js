import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import OrgDetail from './';
import OrgDetailPage from './orgDetailPage';
import OrgPrograms from './orgPrograms';
import DataSets from './dataSets';
import SpiTags from './spiTag';
import SdgTags from './sdgTag';
import RegionsServed from './regionsServed';
import Resources from './resources';
import programs from './programs';


const OrgDetailRoutes = (props) => (
        <OrgDetail url={props.match} history={props.history}>
            <Switch>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/data-sets`} component={DataSets} />
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/resources`} component={Resources} />
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/regions-served`} component={RegionsServed} />
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/spi-tags`} component={SpiTags} />
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/sdg-tags`} component={SdgTags} />
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/programs`} component={programs} />
                <PrivateRoute authenticated={true} orgId={props.match.params.id} exact path={`${props.match.path}`} component={OrgDetailPage} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;