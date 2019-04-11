import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { onAddOrgChartChild } from "../../../actions/orgChart/onAddChild";
import { fetchOrgHierarchy } from "../../../actions/orgDetail/orgChartAction";
class addOrganization extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchOrgHierarchy(this.props.match.params.id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = e => {
    e.preventDefault();
    const { childOrgName, childOrgType } = this.state;
    const apiObj = {
      parentId: this.props.orgId,
      childOrgType:
        childOrgType || this.props.history.location.search.replace(/\?/, ""),
      childOrgName
    };
    this.props.onAddOrgChartChild(apiObj);
  };

  render() {
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="childOrganizationType">
                      Child Organization Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="childOrganizationType"
                      placeholder="Enter Program Name"
                      name="childOrgType"
                      readOnly
                      onChange={this.onChange}
                      value={this.props.history.location.search.replace(
                        /\?/,
                        ""
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="childOrganizationName">
                      Child Organization Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="childOrganizationName"
                      placeholder="Enter Child Organization Name"
                      name="childOrgName"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center footer-actions active">
                <button
                  className="btn"
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.goBack();
                  }}
                >
                  Go Back
                </button>
                <button className="btn btn-primary" onClick={this.onSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: orgId => push(`/organizations/${orgId}/organization-chart`),
      onAddOrgChartChild,
      fetchOrgHierarchy
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(addOrganization);
