import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      let combinedProps = {...rest, ...props};
      return authenticated === true ? (
        <Component {...combinedProps}/>
      ) : (
        <Redirect to="/" />
      )}
    }
  />
);

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);