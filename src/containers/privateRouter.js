import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";
import { titleCase } from "../util/util";
import Can from "./Can";

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
        <DocumentTitle
          title={title ? titleCase(title) + " - WinWin" : "WinWin"}
        >
          {rest.perform ? (
            <Can
              role={rest.user && rest.user.role}
              perform={rest.perform}
              yes={() => <Component {...combinedProps} />}
              no={() => <Redirect to="/organizations" />} //redirect to orglanding page on redirect
              // no={() => <h1>privatenooo</h1>}
            />
          ) : (
            <Component {...combinedProps} />
          )}
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
  auth: state.auth,
  user: state.session.user
});

export default connect(mapStateToProps)(PrivateRoute);
