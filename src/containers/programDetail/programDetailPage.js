import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveProgramDetailsAction } from "../../actions/program/saveProgramDetailsAction";
import { deleteProgram } from "../../actions/program/deleteProgramAction";
import { PopupModal } from "../ui/popupModal";
//import { push } from "react-router-redux";
import { push } from 'connected-react-router';
import Can from "../Can";
class ProgramDetailPage extends Component {
  state = {
    editProgramDetail: false,
    programDetail: "",
    formError: {
      name: null
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.programDetail !== prevProps.programDetail) {
      if (!this.props.programDetail.error) {
        this.setState({
          programDetail: Object.assign({}, this.props.programDetail.data)
        });
      }
    }
  }

  render() {
    const { editProgramDetail, programDetail, formError } = this.state;
    const { session } = this.props;
    if (!programDetail || !programDetail.response) {
      return null;
    }
    let progDetail = programDetail.response;
    return (
      <section className="dashboard-content p-0 py-3 program-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <form>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <div className="row">
                    <ul
                      className={`action-icons ${
                        !editProgramDetail ? "active" : ""
                      }`}
                    >
                      <Can
                        role={session.user && session.user.role}
                        perform="programDetails:edit"
                        yes={() => (
                          <li>
                            <a href="javascript:;" onClick={this.onEdit}>
                              <i className="icon-edit" />
                            </a>
                          </li>
                        )}
                      />
                      <Can
                        role={session.user && session.user.role}
                        perform="programDetails:delete"
                        yes={() => (
                          <li>
                            <a
                              href="javascript:;"
                              data-toggle="modal"
                              data-target="#deleteModal"
                            >
                              <i className="icon-delete" />
                            </a>
                          </li>
                        )}
                      />
                    </ul>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="programName">Program Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="programName"
                          name="name"
                          readOnly={`${!editProgramDetail ? "readOnly" : ""}`}
                          placeholder="Enter Program Name"
                          value={progDetail.name}
                          onChange={this.onChange}
                        />
                        {
                          formError.name && (
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
                          readOnly={`${!editProgramDetail ? "readOnly" : ""}`}
                          rows="5"
                          value={progDetail.description || ""}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="websiteUrl">Program URL</label>
                        <input
                          type="text"
                          className="form-control"
                          id="websiteUrl"
                          name="websiteUrl"
                          readOnly={`${!editProgramDetail ? "readOnly" : ""}`}
                          placeholder="Enter Program URL"
                          value={progDetail.websiteUrl || ""}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`row justify-content-center footer-actions ${
                      editProgramDetail ? "active" : ""
                    }`}
                  >
                    <button
                      className="btn"
                      onClick={e => this.onCancelProgramEdit(e)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={e => this.onSave(e)}
                    >
                      Save
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={
            `Are you sure you want to delete '${this.props.programDetail.data.response.name ||
            (this.props.programDetail.data.response[0] && this.props.programDetail.data.response[0].name)}' ?`}
          primarybuttontext="Delete Program"
          secondarybuttontext="Cancel"
          handleDelete={this.handleDelete}
        />
      </section>
    );
  }

  handleDelete = () => {
    const {
      programId,
      orgId,
      match: { params: { id } = {} } = {},
      programDetail: { data: { response = {} } = {} } = {}
    } = this.props;
    this.props.deleteProgram(orgId, response.id || response[0].id, programId);
    this.props.changePage(orgId);
  };

  validateForm = () => {
    const formError = {};
    let allClear = false;

    // Validate program name
    const progName = this.state.programDetail.response.name;
    if (progName && progName.trim()) {
      allClear = true;
      formError['name'] = '';
    }
    else {
      formError['name'] = "Program name cannot be blank";
      allClear = false;
    }

    this.setState({ formError });
    return allClear;
  };

  onChange = e => {
    let progDetail = this.state.programDetail;
    const { target: { name, value } = {} } = e;
    progDetail.response[name] = value;
    this.setState({ programDetail: progDetail });
  };

  onEdit = () => {
    this.setState({
      editProgramDetail: true
    });
  };
  onCancelProgramEdit = e => {
    e.preventDefault();
    this.setState({
      editProgramDetail: false
    });
  };
  onSave = e => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({
        editProgramDetail: false
      });

      const { programDetail: { response: apiObj } } = this.state;

      this.props.saveProgramDetailsAction(apiObj.length ? apiObj : [apiObj]);
    }
  };
}

const mapStateToProps = state => ({
  programDetail: state.programDetail,
  session: state.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: orgId => push(`/organizations/${orgId}/programs`),
      saveProgramDetailsAction,
      deleteProgram
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailPage);
