import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';

import OrgLanding from './';
import OrgDetailRoutes from '../orgDetail/orgDetail.routes';
import OrgList from './orgList';
import CreateOrg from '../createOrg';

const OrgLandingRoutes = (props) => (
    <OrgLanding>
          <Switch>
              <PrivateRoute authenticated={props.isAuthenticated} exact path="/organizations" component={OrgList} />
              <PrivateRoute authenticated={props.isAuthenticated} exact path="/organizations/new" component={CreateOrg} />
              <PrivateRoute authenticated={props.isAuthenticated} path="/organizations/:id" component={OrgDetailRoutes} />
          </Switch>
    </OrgLanding>
)

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(OrgLandingRoutes);