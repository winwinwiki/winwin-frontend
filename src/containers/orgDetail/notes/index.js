import React from "react";
import Note from "./note";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchOrgNotes,
  deleteNote,
  saveNote,
  updateNote
} from "../../../actions/orgDetail/notesAction";

import { NoteModal } from "./noteModal";
import { PopupModal } from "../../ui/popupModal";
class Notes extends React.Component {
  state = {
    modaltitle: "",
    selectedNoteId: "",
    note: "",
    notesList: "",
    formError: { note: "" }
  };

  componentDidMount() {
    const { orgId } = this.props;
    this.props.fetchOrgNotes(orgId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notesList !== this.props.notesList) {
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
            <div className="section-title border-bottom pb-3 mb-3">Notes</div>
            <form>
              <ul className="list-group list-group-flush">
                {notesList &&
                  notesList.map((note, index) => (
                    <Note
                      key={index}
                      data={note}
                      selectedNote={this.setNodeId}
                      onUpdateNote={this.onUpdateNote}
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
          formError={this.state.formError}
          validateField={this.validateField}
        />

        {/* Delete Modal */}
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete this note ?`}
          primarybuttontext="Delete Note"
          secondarybuttontext="Cancel"
          handleDelete={() => this.onDeleteNote(this.props.orgId)}
        />
      </section>
    );
  }

  validateField = e => {
    this.validateNoteForm(e.target.name, e.target.value);
  };

  validateNoteForm = (field, value) => {
    const { formError } = this.state;

    if (field === "note") {
      if (!value) {
        formError.note = "This field is required.";
        this.setState({ formError });
        return;
      }
      formError.note = "";
      this.setState({ formError });
      return;
    }
  };

  onUpdateNote = apiObj => {
    this.props.updateNote(apiObj);
  };

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
      modaltitle: "Add Note",
      formError: { note: "" }
    });
  };

  saveNewNote = () => {
    if (!this.state.note) {
      this.validateNoteForm("note", this.state.note);
      return;
    }
    this.props.saveNote({
      organizationId: this.props.orgId,
      name: this.state.note
    });
  };

  onDeleteNote = () => {
    const { selectedNoteId } = this.state;
    this.props.deleteNote({
      id: selectedNoteId,
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
      saveNote,
      updateNote
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
