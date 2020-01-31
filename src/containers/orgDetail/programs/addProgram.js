import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import { push } from "react-router-redux";
import { push } from 'connected-react-router';
import { onAddProgram } from "../../../actions/program/addProgramAction";
class addProgram extends Component {
  //state = {};
  constructor(props) {
    super(props);
  this.state = {
    formError: {
      name: ""
    }
  };
  this.validateForm = this.validateForm.bind(this);
  
}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const formError = {};
    let allClear = true;

    // Validate Program name
    if (document.querySelector("#programName").value.trim().length < 1) {
        formError['name'] = "Program name is required.";
        allClear = false;
    }
    this.setState({ formError });
    return allClear;
  };

  onSave = e => {
    e.preventDefault();
    const { description, programName, programUrl } = this.state;

    if(!this.validateForm()){
      alert('Please fix the error in the form before submission');
      return;
    }
    const apiObj = {
      organizationId: this.props.orgId,
      name: programName,
      description,
      websiteUrl: programUrl,
      // address obj is to be removed
      address: {
        street: "",
        state: "",
        county: "",
        country: "",
        city: "",
        placeId: "",
        zip: null
      }
    };
    this.props.onAddProgram(apiObj);
    this.props.changePage(this.props.orgId);
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
                    <label htmlFor="programName">Program Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="programName"
                      name="programName"
                      placeholder="Enter Program Name"
                      onChange={this.onChange}
                    />
                    {formError.name && (
                    <small className="form-element-hint text-danger">
                      {formError.name}
                    </small>
                  )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="description">Program Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="5"
                      placeholder="Enter Program Description"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="programUrl">Program URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="programUrl"
                      name="programUrl"
                      placeholder="Enter Program URL"
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
                  Cancel
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

// const mapStateToProps = state => ({
//   createOrg: state.createOrg
// });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: orgId => push(`/organizations/${orgId}/programs`),
      onAddProgram
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(addProgram);
