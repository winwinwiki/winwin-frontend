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
import IdleTimer from "react-idle-timer";
import { bindActionCreators } from "redux";
import { logout, onLogin } from "../../actions/auth/loginAction";

const OrgLandingRoutes = props => (
  <OrgLanding history={props.history} match={props.match}>
    <IdleTimer
      onIdle={() => props.logout()}
      debounce={250}
      timeout={1000 * 60 * 60 * 2} //2 hours timeout
    />
    <Switch>
      <PrivateRoute
        title={"Organizations - WinWin"}
        authenticated={props.isAuthenticated}
        exact
        path="/organizations"
        perform="organizations:list"
        component={OrgList}
      />
      <CrumbRoute
        title={"New Organization"}
        exact
        path="/organizations/new"
        perform="organizations:create"
        component={CreateOrg}
      />
      <CrumbRoute
        title={"Upload Data Feed"}
        exact
        path="/organizations/uploadDataFeed"
        perform="organizations:multiCreate"
        component={UploadDataFeed}
      />
      {/* <CrumbRoute title={"Organization Details"} path="/organizations/:id/programs/:programId" component={ProgramDetailRoutes} /> */}
      <CrumbRoute
        title={props.organizationDetail && props.organizationDetail.name}
        description={
          props.organizationDetail && props.organizationDetail.description
        }
        path="/organizations/:id"
        perform="organizationDetails:list"
        component={OrgDetailRoutes}
      />
    </Switch>
  </OrgLanding>
);

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  organizationDetail: state.orgDetail.data && state.orgDetail.data.response
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout, onLogin }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgLandingRoutes);
