import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import ProgramDetail from './';
import ProgramDetailPage from './programDetailPage';

import DataSets from '../orgDetail/dataSets';
import Resources from '../orgDetail/resources';
import SpiTags from '../orgDetail/spiTag';
import SdgTags from '../orgDetail/sdgTag';
import RegionsServed from '../orgDetail/regionsServed';


const ProgramDetailRoutes = (props) => (
    <ProgramDetail url={props.match} history={props.history}>
        <Switch>
            <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/data-sets`} component={DataSets} type={"Program"}/>
            <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/resources`} component={Resources} type={"Program"}/>
            <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/regions-served`} component={RegionsServed} type={"Program"}/>
            <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/spi-tags`} component={SpiTags} type={"Program"}/>
            <PrivateRoute authenticated={props.isAuthenticated} exact path={`${props.match.path}/sdg-tags`} component={SdgTags} type={"Program"}/>
            <PrivateRoute authenticated={props.isAuthenticated} path={`${props.match.path}`} component={ProgramDetailPage} />
        </Switch>
    </ProgramDetail>
)

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(ProgramDetailRoutes);