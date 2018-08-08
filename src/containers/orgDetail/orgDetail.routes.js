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
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/data-sets`} component={DataSets} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/resources`} component={Resources} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/regions-served`} component={RegionsServed} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/spi-tags`} component={SpiTags} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/sdg-tags`} component={SdgTags} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/programs`} component={programs} type={"Organization"}/>
                <PrivateRoute authenticated={true} orgId={props.match.params.id} exact path={`${props.match.path}`} component={OrgDetailPage} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;