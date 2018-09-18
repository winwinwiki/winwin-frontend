import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import OrgDetail from './';
import OrgDetailPage from './orgDetailPage';
import ViewHistory from './viewHistory';
import DataSets from './dataSets';
import SpiTags from './spiTag';
import SdgTags from './sdgTag';
import NewPage from './newPage';
import RegionsServed from './regionsServed';
import Resources from './resources';
import Programs from './programs';
import AddProgram from './programs/addProgram';
import OrgChart from '../orgChart';
import AddChildOrganisation from './childOrganization';


const OrgDetailRoutes = (props) => (
        <OrgDetail match={props.match} history={props.history}>
            <Switch>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/view-history`} component={ViewHistory} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/data-sets`} component={DataSets} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/resources`} component={Resources} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/regions-served`} component={RegionsServed} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/spi-tags`} component={SpiTags} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/sdg-tags`} component={SdgTags} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/new-page`} component={NewPage} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/programs`} component={Programs} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/new-program`} component={AddProgram} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/new-child-organization`} component={AddChildOrganisation} type={"Organization"}/>
                <PrivateRoute authenticated={true} exact path={`${props.match.path}/organization-chart`} component={OrgChart} type={"Organization"}/>
                <PrivateRoute authenticated={true} orgId={props.match.params.id} exact path={`${props.match.path}`} component={OrgDetailPage} />
            </Switch>
        </OrgDetail>
)

export default OrgDetailRoutes;