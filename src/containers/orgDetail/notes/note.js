import React from "react";

class Note extends React.Component {
  state = {
    isEditable: false,
    data: {
      noteId: "",
      note: ""
    }
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.data.noteId !== prevState.data.noteId) {
      return {
        ...prevState,
        data: {
          noteId: nextProps.data.id,
          note: nextProps.data.name
        }
      };
    }

    return null;
  };

  render() {
    const { isEditable } = this.state;
    const { selectedNote } = this.props;
    const { data } = this.state;
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
                  onChange={this.onChange}
                />
              ) : (
                <p className="mt-3 readOnlyTextarea">{data.note}</p>
              )}
            </div>
          </div>
        </div>
        {isEditable && (
          <div className="row mx-0 justify-content-end footer-actions active">
            <button className="btn btn-sm" onClick={this.cancelNote}>
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" onClick={this.saveNote}>
              Save
            </button>
          </div>
        )}
      </li>
    );
  }

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        note: e.target.value
      }
    });
  };

  editNote = id => {
    this.setState({
      isEditable: true,
      noteId: id
    });
  };

  saveNote = e => {
    e.preventDefault();
    const { data: { noteId, note } = {} } = this.state;
    this.setState({
      isEditable: false
    });
    const apiObj = {
      id: noteId,
      name: note,
      organizationId: this.props.data.organizationId
    };
    this.props.onUpdateNote(apiObj);
  };

  cancelNote = () => {
    this.setState({
      isEditable: false
    });
  };
}

export default Note;
