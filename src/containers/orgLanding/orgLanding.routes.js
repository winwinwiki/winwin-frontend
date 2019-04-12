import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router";
import PrivateRoute from "../privateRouter";
import CrumbRoute from "../common/crumbRoute";
import OrgLanding from "./";
import OrgDetailRoutes from "../orgDetail/orgDetail.routes";
import OrgList from "./orgList";
import CreateOrg from "../createOrg";
import UploadDataFeed from "../uploadDataFeed";
import { titleCase } from "../../util/util";

const OrgLandingRoutes = props => (
  <OrgLanding history={props.history} match={props.match}>
    <Switch>
      <PrivateRoute
        title={"Organizations - WinWin"}
        authenticated={props.isAuthenticated}
        exact
        path="/organizations"
        component={OrgList}
      />
      <CrumbRoute
        title={"New Organization"}
        exact
        path="/organizations/new"
        component={CreateOrg}
      />
      <CrumbRoute
        title={"Upload Data Feed"}
        exact
        path="/organizations/uploadDataFeed"
        component={UploadDataFeed}
      />
      {/* <CrumbRoute title={"Organization Details"} path="/organizations/:id/programs/:programId" component={ProgramDetailRoutes} /> */}
      <CrumbRoute
        title={
          props.organizationDetail && titleCase(props.organizationDetail.name)
        }
        description={
          props.organizationDetail && props.organizationDetail.description
        }
        path="/organizations/:id"
        component={OrgDetailRoutes}
      />
    </Switch>
  </OrgLanding>
);

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  organizationDetail: state.orgDetail.data && state.orgDetail.data.response
});

export default connect(
  mapStateToProps,
  null
)(OrgLandingRoutes);
