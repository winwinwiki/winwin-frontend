import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";

const PrivateRoute = ({
  component: Component,
  authenticated,
  title,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      let combinedProps = { ...rest, ...props };
      return authenticated === true ? (
        <DocumentTitle title={title ? title + " - WinWin" : "WinWin"}>
          <Component {...combinedProps} />
        </DocumentTitle>
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
