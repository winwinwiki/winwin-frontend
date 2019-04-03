import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { onAddProgram } from "../../../actions/program/addProgramAction";
class addProgram extends Component {
  state = {};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSave = e => {
    e.preventDefault();
    const { description, programName } = this.state;
    const apiObj = {
      parentId: this.props.orgId,
      name: programName,
      description,
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
                    <label htmlFor="programName">Program Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="programName"
                      name="programName"
                      placeholder="Enter Program Name"
                      onChange={this.onChange}
                    />
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
      changePage: () => push("/programs"),
      onAddProgram
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(addProgram);
