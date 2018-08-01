import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, orgId, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
    authenticated: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);