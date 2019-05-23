import React from "react";
import Note from "./note";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchOrgNotes,
  deleteNote,
  saveNote
} from "../../../actions/orgDetail/notesAction";

import { NoteModal } from "./noteModal";
class Notes extends React.Component {
  state = {
    modaltitle: "",
    selectedNoteId: "",
    note: "",
    notesList: ""
  };

  componentDidMount() {
    const { orgId } = this.props;
    this.props.fetchOrgNotes(orgId);
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.notesList) !==
      JSON.stringify(this.props.notesList)
    ) {
      this.setState({
        notesList: nextProps.notesList.response
      });
    }
  }

  render() {
    const { modaltitle, notesList, note } = this.state;
    const { isNotesSuccess } = this.props;
    if (!isNotesSuccess || !notesList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>

            {notesList && notesList.length > 0 && (
              <div className="section-title border-bottom pb-3 mb-3">Notes</div>
            )}
            <form>
              <ul className="list-group list-group-flush">
                {notesList &&
                  notesList.map((note, index) => (
                    <Note
                      key={index}
                      data={note}
                      selectedNote={this.setNodeId}
                    />
                  ))}
                <li className="list-group-item px-0 pt-4">
                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#noteModal"
                    onClick={this.addNewNoteModal}
                  >
                    <i className="icon-add mr-2" /> Add Another
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <NoteModal
          note={note}
          title={modaltitle}
          handleChange={this.handleChange}
          saveNote={this.saveNewNote}
        />

        {/* Delete Modal */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="dashboard-container">
                <div className="dashboard-header">
                  <div className="modal-header flex-column">
                    <div className="d-flex w-100 p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Alert!
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body dashboard-content">
                  Are you sure you want to delete this Note?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={this.onDeleteNote}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setNodeId = id => {
    this.setState({
      selectedNoteId: id
    });
  };

  //reset new note modal fields to null
  addNewNoteModal = () => {
    this.setState({
      note: "",
      modaltitle: "Add Note"
    });
  };

  saveNewNote = () => {
    this.props.saveNote({
      organizationId: this.props.orgId,
      note: this.state.note
    });
  };

  onDeleteNote = () => {
    const { selectedNoteId, notesList } = this.state;
    const filteredNotesList = notesList.filter(
      x => x.noteId !== selectedNoteId
    );
    this.setState({ notesList: filteredNotesList });
    this.props.deleteNote({
      noteId: selectedNoteId,
      organizationId: this.props.orgId
    });
  };
}

const mapStateToProps = state => ({
  notesList: state.notes.notesList,
  isNotesSuccess: state.notes.isNotesSuccess
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgNotes,
      deleteNote,
      saveNote
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
