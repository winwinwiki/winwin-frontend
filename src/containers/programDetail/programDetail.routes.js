import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import ProgramDetail from './';
import ProgramDetailPage from './programDetailPage';
import DataSets from './dataSets';
import SpiTags from './spiTag';
import SdgTags from './sdgTag';
import RegionsServed from './regionsServed';

const ProgramDetailRoutes = ({ match }) => (
        <ProgramDetail url={match}>
            <Switch>
                <PrivateRoute authenticated={true} exact path={`${match.path}`} component={ProgramDetailPage} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/data-sets`} component={DataSets} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/regions-served`} component={RegionsServed} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/spi-tags`} component={SpiTags} />
                <PrivateRoute authenticated={true} exact path={`${match.path}/sdg-tags`} component={SdgTags} />
            </Switch>
        </ProgramDetail>
)

export default ProgramDetailRoutes;