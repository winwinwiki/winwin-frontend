import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Breadcrumb } from "react-breadcrumbs";
import Can from "../Can";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { titleCase } from "../../util/util";

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(
  ({ component: Component, includeSearch = false, render, ...props }) => (
    <Route
      {...props}
      render={routeProps => (
        <Breadcrumb
          data={{
            title: props.title,
            pathname: routeProps.match.url,
            search: includeSearch ? routeProps.location.search : null
          }}
        >
          <DocumentTitle
            title={
              props.title ? titleCase(props.title) + " - NewImpact" : "NewImpact"
            }
          >
            {Component && props.perform ? (
              <Can
                role={props.session.user && props.session.user.role}
                perform={props.perform}
                yes={() => (
                  <Component
                    title={props.title}
                    orgName={props.orgName}
                    description={props.description}
                    {...routeProps}
                  />
                )}
                no={() => <Redirect to="/organizations" />} //redirect to orglanding page on redirect
                // no={() => <h1>crumbnooo</h1>}
              />
            ) : !props.perform ? (
              <Component
                title={props.title}
                description={props.description}
                {...routeProps}
              />
            ) : (
              render(routeProps)
            )}
          </DocumentTitle>
        </Breadcrumb>
      )}
    />
  )
);
