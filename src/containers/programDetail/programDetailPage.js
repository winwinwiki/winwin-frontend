import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveProgramDetailsAction } from "../../actions/program/saveProgramDetailsAction";
class ProgramDetailPage extends Component {
  state = {
    editProgramDetail: false,
    programDetail: ""
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.programDetail !== prevState.programDetail) {
      return {
        ...prevState,
        programDetail: nextProps.programDetail.data
      };
    }

    return null;
  };

  render() {
    const { editProgramDetail } = this.state;
    const { programDetail } = this.state;
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
                      <li>
                        <a href="javascript:;" onClick={() => this.onEdit()}>
                          <i className="icon-edit" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
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
                          value={progDetail.description}
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
      </section>
    );
  }

  onChange = e => {
    const { programDetail: { response } = {} } = this.state;
    const { target: { name, value } = {} } = e;
    response[name] = value;
    this.setState({ programDetail: response });
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
    this.setState({
      editProgramDetail: false
    });
    const {
      programDetail: { response: apiObj }
    } = this.state;
    this.props.saveProgramDetailsAction([apiObj]);
  };
}

const mapStateToProps = state => ({
  programDetail: state.programDetail
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveProgramDetailsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDetailPage);
