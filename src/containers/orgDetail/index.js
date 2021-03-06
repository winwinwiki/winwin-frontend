import React from "react";
import SideBar from "../sidebar";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchOrganisationDetail } from "../../actions/orgDetail/orgDetailAction";
import Can from "../Can";

class OrgDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgDetail: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchOrganisationDetail({ orgId: match.params.id });
  }

  componentWillReceiveProps(nextProps) {
    const { organizationDetail } = this.props;
    if (
      nextProps &&
      nextProps.organizationDetail !== organizationDetail &&
      nextProps.organizationDetail.data
    ) {
      if (!nextProps.organizationDetail.error) {
        this.setState({
          orgDetail: nextProps.organizationDetail.data
        });
      }
    }
  }
  render() {
    const { orgDetail } = this.state;
    const { organizationDetail, match, history, session } = this.props;
    if (!orgDetail || !organizationDetail || organizationDetail.error) {
      return null;
    }
    if (history.location.pathname.includes("/programs/")) {
      return <React.Fragment>{this.props.children}</React.Fragment>;
    }
    return (
      <React.Fragment>
        <div className="py-4 border-bottom d-flex justify-content-between">
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
                  <Can
                    role={session.user && session.user.role}
                    perform="programs:create"
                    yes={() => (
                      <Link
                        className="dropdown-item"
                        to={`${match.url}/new-program`}
                      >
                        Add Program
                      </Link>
                    )}
                  />

                  {/* <a className="dropdown-item" href="#">
                    Add Child Organization
                  </a> */}
                  <Can
                    role={session.user && session.user.role}
                    perform="organizationHistory:list"
                    yes={() => (
                      <Link
                        className="dropdown-item"
                        to={`${match.url}/view-history`}
                      >
                        View History
                      </Link>
                    )}
                  />
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
  session: state.session
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
)(OrgDetail);
