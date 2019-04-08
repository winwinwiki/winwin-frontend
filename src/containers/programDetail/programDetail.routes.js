import React from "react";
import { Switch } from "react-router";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchOrganisationDetail } from "../../actions/orgDetail/orgDetailAction";
import PrivateRoute from "../privateRouter";
import ProgramDetail from "./";
import ProgramDetailPage from "./programDetailPage";

import DataSets from "../orgDetail/dataSets";
import Resources from "../orgDetail/resources";
import SpiTags from "../orgDetail/spiTag";
import SdgTags from "../orgDetail/sdgTag";
import RegionsServed from "../orgDetail/regionsServed";
import { PROGRAM } from "../../constants";

class ProgramDetailRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progDetail: {}
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchOrganisationDetail({
      orgId: match.params.id,
      programId: match.params.programId
    });
  }

  componentWillReceiveProps(nextProps) {
    const { programDetail } = this.props;
    if (
      nextProps.programDetail !== programDetail &&
      nextProps.programDetail.data
    ) {
      if (!nextProps.programDetail.error) {
        this.setState({
          progDetail: nextProps.programDetail.data
        });
      }
    }
  }

  render() {
    const {
      isAuthenticated,
      match,
      history,
      programDetail: { data = {} } = {}
    } = this.props;
    return (
      <ProgramDetail match={match} history={history}>
        <Switch>
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            exact
            path={`${match.path}/data-sets`}
            component={DataSets}
            type={PROGRAM}
          />
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            exact
            path={`${match.path}/resources`}
            component={Resources}
            type={PROGRAM}
          />
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            exact
            path={`${match.path}/regions-served`}
            component={RegionsServed}
            type={PROGRAM}
          />
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            exact
            path={`${match.path}/spi-tags`}
            component={SpiTags}
            type={PROGRAM}
          />
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            exact
            path={`${match.path}/sdg-tags`}
            component={SdgTags}
            type={PROGRAM}
          />
          <PrivateRoute
            title={data && data.response.name}
            orgId={match.params.programId}
            authenticated={isAuthenticated}
            path={`${match.path}`}
            component={ProgramDetailPage}
          />
        </Switch>
      </ProgramDetail>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  programDetail: state.programDetail
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrganisationDetail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailRoutes);
