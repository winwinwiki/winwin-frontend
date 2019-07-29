import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { onAddOrgChartChild } from "../../../actions/orgChart/onAddChild";
import { fetchOrgHierarchy } from "../../../actions/orgDetail/orgChartAction";
class addOrganization extends Component {
  state = {
    formError: {
      childOrgName: "",
      childOrgType: ""
    }
  };

  componentDidMount() {
    this.props.fetchOrgHierarchy(this.props.match.params.id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = e => {
    e.preventDefault();
    const { childOrgName, childOrgType, formError } = this.state;
    const { location: { state: { parentId } = {} } = {} } = this.props;
    if (!childOrgName) {
      this.validateAddForm("childOrgName", childOrgName);
      return;
    } else if (formError.childOrgName !== "") {
      return;
    }
    const apiObj = {
      parentId: parentId,
      childOrgType:
        childOrgType || this.props.history.location.search.replace(/\?/, ""),
      childOrgName
    };
    this.props.onAddOrgChartChild(apiObj);
    this.props.changePage(this.props.orgId);
  };

  validateForm = e => {
    this.validateAddForm(e.target.name, e.target.value);
  };
  validateAddForm = (field, value) => {
    const { formError } = this.state;
    if (field === "childOrgName") {
      if (!value) {
        formError[field] = "name is required.";
        this.setState({ formError });
        return;
      }
      formError[field] = "";
      this.setState({ formError });
      return;
    }
  };

  render() {
    const { formError } = this.state;
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <form>
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
                      onBlur={this.validateForm}
                      onChange={this.onChange}
                    />
                    {formError.childOrgName && (
                      <small className="form-element-hint text-danger">
                        {formError.childOrgName}
                      </small>
                    )}
                  </div>
                </div>
              </div>
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
                      placeholder="Enter Child Organization Type"
                      name="childOrgType"
                      onBlur={this.validateForm}
                      // readOnly
                      onChange={this.onChange}
                      // value={this.props.history.location.search.replace(
                      //   /\?/,
                      //   ""
                      // )}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center footer-actions active">
                <button
                  className="btn"
                  onClick={e => {
                    e.preventDefault();
                    this.props.changePage(this.props.match.params.id, "goback");
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
      changePage: (orgId, param) =>
        push(`/organizations/${orgId}/organization-chart`, param),
      onAddOrgChartChild,
      fetchOrgHierarchy
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(addOrganization);
