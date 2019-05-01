import React from "react";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false
    };
    this.editNote = this.editNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.cancelNote = this.cancelNote.bind(this);
  }

  render() {
    const { isEditable } = this.state;
    const { data, selectedNote } = this.props;
    return (
      <li className="list-group-item border-0 px-0">
        {!isEditable && (
          <div className="row">
            <ul className="action-icons">
              {/* <li>
                <a
                  href="javascript:;"
                  onClick={() => this.editNote(data.noteId)}
                >
                  <i className="icon-edit" />
                </a>
              </li> */}
              <li>
                <a
                  href="javascript:;"
                  data-toggle="modal"
                  data-target="#deleteModal"
                  onClick={() => selectedNote(data.noteId)}
                >
                  <i className="icon-delete" />
                </a>
              </li>
            </ul>
          </div>
        )}
        <div className="row mt-2">
          <div className="col">
            <div className="form-group">
              <label htmlFor="note" className="sr-only">
                Added by {data.createdBy}
              </label>
              {isEditable ? (
                <textarea
                  row="5"
                  className="form-control"
                  id="note"
                  placeholder="Enter Note"
                  value={data.note}
                />
              ) : (
                <p className="mt-3 readOnlyTextarea">{data.note}</p>
              )}
            </div>
          </div>
        </div>
        {isEditable && (
          <div className="row mx-0 justify-content-end footer-actions active">
            <button className="btn btn-sm" onClick={() => this.cancelNote()}>
              Cancel
            </button>
            <button
              className="btn btn-sm btn-primary"
              onSubmit={() => this.saveNote()}
            >
              Save
            </button>
          </div>
        )}
      </li>
    );
  }

  editNote(id) {
    this.setState({
      isEditable: true
    });
  }

  saveNote() {
    this.setState({
      isEditable: false
    });
  }

  cancelNote() {
    this.setState({
      isEditable: false
    });
  }
}

export default Note;
