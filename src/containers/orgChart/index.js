import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { OrgChartComponent } from "./orgChartComponent";
import "./orgChart.css";
import { fetchOrgHierarchy } from "../../actions/orgDetail/orgChartAction";
import { resetOrgHierarchyData } from "../../actions/orgDetail/orgChartAction";
import isEmpty from "lodash/isEmpty";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../actions/common/loaderActions";
class OrgChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgChartData: null,
      visibleLevel: 2
    };
  }
  componentDidMount() {
    const { visibleLevel } = this.state;
    const { orgHierarchy } = this.props;
    this.props.startLoaderAction();
    this.props.fetchOrgHierarchy(this.props.match.params.id);
    // if (Object.keys(orgHierarchy).length) {
    //   let chart = new OrgChartComponent(
    //     this.desiredOrgData(orgHierarchy.response),
    //     visibleLevel,
    //     this.orgDetail,
    //     this.addNewChild
    //   );
    //   chart.renderOrgChart();
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { visibleLevel } = this.state;
    if (
      JSON.stringify(nextProps.orgHierarchy) !==
      JSON.stringify(this.props.orgHierarchy)
    ) {
      this.setState({
        orgChartData: nextProps.orgHierarchy.response
      });
      if (!isEmpty(nextProps.orgHierarchy)) {
        let chart = new OrgChartComponent(
          this.desiredOrgData(nextProps.orgHierarchy.response),
          visibleLevel,
          this.orgDetail,
          this.addNewChild
        );
        chart && chart.renderOrgChart();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.orgHierarchy !== this.props.orgHierarchy &&
      this.props.orgHierarchy.response
    ) {
      this.props.stopLoaderAction();
    }
  }

  componentWillUnmount() {
    this.props.resetOrgHierarchyData();
  }

  render() {
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card orgChartContainer">
          <div className="col-md-24 d-flex flex-column py-3">
            <div id="orgChart" />
          </div>
        </div>
        <div className="col-md-18 m-auto p-2">
          You can move, zoom in and zoom out the Chart
        </div>
      </section>
    );
  }

  desiredOrgData(orgChartData) {
    let _self = this,
      modifiedChildren;
    const orgChartModifiedData = JSON.parse(JSON.stringify(orgChartData));
    if (!orgChartModifiedData.children) {
      orgChartModifiedData["children"] = [
        {
          id:
            orgChartModifiedData.id +
            "_add" +
            orgChartModifiedData.childrenType,
          name: "+ Add New " + orgChartModifiedData.childrenType
        }
      ];
    } else {
      modifiedChildren = orgChartModifiedData.children.map(child =>
        _self.desiredOrgData(child)
      );
      modifiedChildren.push({
        id:
          orgChartModifiedData.id + "_add" + orgChartModifiedData.childrenType,
        name: "+ Add New " + orgChartModifiedData.childrenType
      });
      orgChartModifiedData["children"] = modifiedChildren;
    }
    orgChartModifiedData["className"] = "collapsedChildren";
    return orgChartModifiedData;
  }

  addNewChild = (parentId, childType) => {
    this.props.addChildOrganisation(parentId, childType);
  };
  orgDetail = id => {
    this.props.changePage(id);
  };
}

const mapStateToProps = state => ({
  isFetchOrgHierarchyPending: state.orgChart.isFetchOrgHierarchyPending,
  isFetchOrgHierarchySuccess: state.orgChart.isFetchOrgHierarchySuccess,
  fetchOrgHierarchyError: state.orgChart.fetchOrgHierarchyError,
  orgHierarchy: state.orgChart.orgHierarchy
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/organizations/" + id),
      addChildOrganisation: (parentId, childType) =>
        push(
          "/organizations/" + parentId + "/new-child-organization?" + childType
        ),
      fetchOrgHierarchy,
      resetOrgHierarchyData,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgChart);
