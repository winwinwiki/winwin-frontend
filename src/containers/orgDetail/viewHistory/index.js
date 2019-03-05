import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchOrgHistory } from "../../../actions/orgDetail/orgHistoryAction";

class OrgHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrgHistory(this.props.match.params.id, () => {});
  }

  componentWillReceiveProps(nextProps) {
    // if(JSON.stringify(nextProps.programList) !== JSON.stringify(this.props.programList) ) {
    //     this.setState({
    //         programList: nextProps.programList
    //     });
    // }
  }

  render() {
    const { isFetchOrgHistorySuccess, orgHistory } = this.props;
    if (!isFetchOrgHistorySuccess || !orgHistory) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <div className="row mb-4 py-3 border-bottom">
              <div className="col">{`${orgHistory.name} - View History`}</div>
            </div>
            <div className="row">
              <div className="col">
                {this.renderHistoryList(orgHistory.history)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  renderHistoryList(orgHistory) {
    return orgHistory.map((history, index) => {
      let historyData = history.data.map((historyData, index) => (
        <li key={index}>{historyData}</li>
      ));
      return (
        <div key={index}>
          {`Update by '${history.updatedBy}' ${history.updatedTime}`}
          <ul key={history.id}>{historyData}</ul>
        </div>
      );
    });
  }
}

const mapStateToProps = state => ({
  isFetchOrgHistoryPending: state.orgHistory.isFetchOrgHistoryPending,
  isFetchOrgHistorySuccess: state.orgHistory.isFetchOrgHistorySuccess,
  fetchOrgHistoryError: state.orgHistory.fetchOrgHistoryError,
  orgHistory: state.orgHistory.orgHistory
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgHistory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgHistory);
