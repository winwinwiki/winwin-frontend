import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import PrivateRoute from  '../privateRouter';
import { Route, BrowserRouter } from 'react-router-dom';
import ProgramList from './';
import ProgramListPage from './programListPage';

const ProgramListRoutes = (props) => (
    <ProgramList url={props.match}>
          <Switch>
              <PrivateRoute authenticated={props.isAuthenticated}  path={`${props.match.url}`} component={ProgramListPage} />
          </Switch>
    </ProgramList>
)

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(
    mapStateToProps,
    null
)(ProgramListRoutes);