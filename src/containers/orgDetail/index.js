import React from "react";
import SideBar from "../sidebar";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchOrganisationDetail } from "../../actions/orgDetail/orgDetailAction";
import {
  fetchOrgHierarchy,
  setOrgContext
} from "../../actions/orgDetail/orgChartAction";
import BreadcrumbView from "../ui/breadcrumbs";
import { getPath } from "../../util/util";
import { OrgHierarchySelector } from "../../selectors/OrgHierarchySelector";
import { push } from "react-router-redux";

class OrgDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgDetail: null,
      breadcrumbData: []
    };
  }

  componentDidMount() {
    const { match, parentId } = this.props;
    this.props.fetchOrganisationDetail({ orgId: match.params.id });
  }

  componentWillReceiveProps(nextProps) {
    const { organizationDetail, parentId } = this.props;
    if (
      nextProps &&
      nextProps.organizationDetail !== organizationDetail &&
      nextProps.organizationDetail.data
    ) {
      if (!nextProps.organizationDetail.error) {
        this.setState({
          orgDetail: nextProps.organizationDetail.data,
          breadcrumbData: [
            {
              id: nextProps.organizationDetail.data.response.parentId,
              label: nextProps.organizationDetail.data.response.parentName
            }
          ]
        });
        // nextProps.organizationDetail.data.response.parentId &&
        //   this.props.fetchOrgHierarchy(
        //     nextProps.organizationDetail.data.response.parentId
        //   );
        // nextProps.organizationDetail.data.response.parentId &&
        //   this.props.setOrgContext(
        //     nextProps.organizationDetail.data.response.parentId
        //   );
      }
    }
  }

  handleClick = id => this.props.changePage(id);

  render() {
    const { orgDetail, breadcrumbData } = this.state;
    const { organizationDetail, match, history } = this.props;
    if (!orgDetail || !organizationDetail || organizationDetail.error) {
      return null;
    }
    if (history.location.pathname.includes("/programs/")) {
      return <React.Fragment>{this.props.children}</React.Fragment>;
    }
    // const data =
    //   this.props.orgHierarchy.length &&
    //   this.props.contextId &&
    //   getPath([this.props.orgHierarchy[0]], parseInt(this.props.parentId));
    return (
      <React.Fragment>
        <div className="py-4 border-bottom d-flex justify-content-between">
          {this.props.orgHierarchy.length && (
            <BreadcrumbView items={breadcrumbData} onClick={this.handleClick} />
          )}
          {/* <div
            aria-label="breadcrumb"
            className="col breadcrumb-container pr-0"
          >
            <ol className="breadcrumb row flex-row flex-nowrap pl-0">
              <li className="breadcrumb-item pl-0 pr-4">
                <h1>A</h1>
              </li>
              <li
                className="breadcrumb-item col"
                title="Administration for children &amp; families"
              >
                <h2 className="float-left">
                  Administration for children &amp; families
                </h2>
                <i className="icon icon-arrow float-left" />
              </li>
              <li
                className="breadcrumb-item col"
                title="Administration for children &amp; families"
              >
                <div className="dropdown">
                  <a
                    href="javascript:;"
                    className="mr-1 dropdown-toggle plain"
                    role="button"
                    id="orgLevels"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    ..... <i className="icon icon-arrow float-right" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-left org-levels"
                    aria-labelledby="orgLevels"
                  >
                    <div className="dropdown-container">
                      <a className="dropdown-item" href="#">
                        <i className="icon icon-arrow" /> Administration for
                        children &amp; families
                      </a>
                      <Link
                        className="dropdown-item"
                        to={`${match.url}/new-program`}
                      >
                        <i className="icon icon-arrow" /> Administration for
                        children &amp; families
                      </Link>
                      <a className="dropdown-item" href="#">
                        <i className="icon icon-arrow" /> Administration for
                        children &amp; families
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="icon icon-arrow" /> Administration for
                        children &amp; families
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="icon icon-arrow" /> Administration for
                        children &amp; families
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li
                className="breadcrumb-item col"
                title="Administration for children &amp; families"
              >
                <h2 className="float-left">
                  Administration for children &amp; families
                </h2>
                <i className="icon icon-arrow float-left" />
              </li>
              <li
                className="breadcrumb-item col active"
                title={orgDetail.name}
                aria-current="page"
              >
                <h2 className="float-left">
                  {orgDetail.name} Administration for children &amp; families
                </h2>
                <i className="icon icon-arrow float-left" />
              </li>
              <li
                className="breadcrumb-item col"
                title="Administration for children &amp; families"
              >
                <h2 className="mr-5">
                  Administration for <a href="javascript:;">+ 4 more</a>
                </h2>
              </li>
            </ol>
          </div> */}
          <div className="ml-auto">
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <a
                  href="javascript:;"
                  className="mr-1 dropdown-toggle plain"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="icon-menu mr-2 ml-0" /> Menu
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink"
                >
                  {/* <a className="dropdown-item" href="#">
                    Change Status
                  </a> */}
                  <Link
                    className="dropdown-item"
                    to={`${match.url}/new-program`}
                  >
                    Add Program
                  </Link>
                  {/* <a className="dropdown-item" href="#">
                    Add Child Organization
                  </a> */}
                  <Link
                    className="dropdown-item"
                    to={`${match.url}/view-history`}
                  >
                    View History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex h-100">
          {history.location.pathname.indexOf("view-history") === -1 && (
            <SideBar match={match} history={history} type={"Organisation"} />
          )}
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  organizationDetail: state.orgDetail,
  orgHierarchy: OrgHierarchySelector(state),
  contextId: state.orgChart.contextId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: id => push("/organizations/" + id),
      fetchOrganisationDetail,
      fetchOrgHierarchy,
      setOrgContext
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgDetail);
