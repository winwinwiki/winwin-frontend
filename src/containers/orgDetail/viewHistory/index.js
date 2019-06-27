import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchOrgHistory } from "../../../actions/orgDetail/orgHistoryAction";
import { titleCase, timeSince } from "../../../util/util";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import { orgHistorySelector } from "../../../selectors/orgHistorySelector";
class OrgHistory extends React.Component {
  componentDidMount() {
    this.props.startLoaderAction();
    this.props.fetchOrgHistory(this.props.match.params.id, () => {});
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.orgHistory !== this.props.orgHistory &&
      this.props.orgHistory
    ) {
      this.props.stopLoaderAction();
    }
  }

  render() {
    const { orgHistory, orgName } = this.props;
    if (!orgHistory) {
      return null;
    }
    return (
      <section
        className="dashboard-content p-0 py-3 org-details-container"
        style={{ minWidth: 0 }}
      >
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <div className="row mb-4 py-3 border-bottom">
              <div className="col">{`${orgName} - View History`}</div>
            </div>
            {orgHistory.length ? (
              <div className="row">
                <div className="col">{this.renderHistoryList(orgHistory)}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    );
  }

  renderHistoryList(orgHistory) {
    return orgHistory.map((history, index) => {
      let historyDetailsData = history.details.map((historyData, index) => (
        <li key={index}>{historyData}</li>
      ));
      return (
        <div key={index}>
          {history.title}
          <ul key={new Date()}>{historyDetailsData}</ul>
        </div>
      );
    });
  }
}

const mapStateToProps = state => ({
  orgHistory: orgHistorySelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgHistory,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgHistory);
