import React from "react";
import { Switch } from "react-router";
import PrivateRoute from "../privateRouter";
import CrumbRoute from "../common/crumbRoute";
import OrgDetail from "./";
import OrgDetailPage from "./orgDetailPage";
import ViewHistory from "./viewHistory";
import DataSets from "./dataSets";
import SpiTags from "./spiTag";
import SdgTags from "./sdgTag";
import NewPage from "./newPage";
import RegionsServed from "./regionsServed";
import Resources from "./resources";
import Programs from "./programs";
import Notes from "./notes";
import AddProgram from "./programs/addProgram";
import OrgChart from "../orgChart";
import AddChildOrganisation from "./childOrganization";

import ProgramDetailRoutes from "../programDetail/programDetail.routes";
import Tree from "../sortableTree/sortableTree";
import NotificationToaster from "../ui/notificationToaster";

const OrgDetailRoutes = props => (
  <OrgDetail
    match={props.match}
    history={props.history}
    parentId={props.parentId}
    parentName={props.parentName}
  >
    <NotificationToaster />
    <Switch>
      <CrumbRoute
        title="View History"
        exact
        orgId={props.match.params.id}
        orgName={props.title}
        path={`${props.match.path}/view-history`}
        component={ViewHistory}
        perform="organizationHistory:list"
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetailsDataSet:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/data-sets`}
        component={DataSets}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetailsResources:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/resources`}
        component={Resources}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetailsRegionsServed:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/regions-served`}
        component={RegionsServed}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetailsSPITags:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/spi-tags`}
        component={SpiTags}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetailsSDGTags:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/sdg-tags`}
        component={SdgTags}
        type={"Organization"}
      />
      {/* <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/new-page`}
        component={NewPage}
        type={"Organization"}
      /> */}
      <PrivateRoute
        title={props.title}
        authenticated={true}
        perform="programs:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/programs`}
        component={Programs}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationNotes:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/notes`}
        component={Notes}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="programs:create"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/new-program`}
        component={AddProgram}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationsChart:create"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/new-child-organization`}
        component={AddChildOrganisation}
        type={"Organization"}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationsChart:list"
        exact
        orgId={props.match.params.id}
        path={`${props.match.path}/organization-chart`}
        parentId={props.parentId}
        parentName={props.parentName}
        // component={OrgChart}
        component={Tree}
        type={"Organization"}
      />
      <CrumbRoute
        title={"Program Details"}
        description={props.description}
        orgId={props.match.params.id}
        path={`${props.match.path}/programs/:programId`}
        perform="programDetails:list"
        component={ProgramDetailRoutes}
      />
      <PrivateRoute
        title={props.title}
        description={props.description}
        authenticated={true}
        perform="organizationDetails:list"
        orgId={props.match.params.id}
        exact
        path={`${props.match.path}`}
        component={OrgDetailPage}
      />
    </Switch>
  </OrgDetail>
);

export default OrgDetailRoutes;
