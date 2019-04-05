import React from "react";

export const NoteModal = ({ note, title, handleChange, saveNote }) => (
  <div
    className="modal fade show"
    id="noteModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="noteModallLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="modal-header flex-column">
              <div className="d-flex w-100 p-3">
                <h5 className="modal-title" id="noteModalLabel">
                  {title}
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
            <form>
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="new-note">Note</label>
                        <textarea
                          className="form-control"
                          id="new-note"
                          name="note"
                          rows="5"
                          onChange={handleChange}
                          placeholder="Add Text"
                          value={note}
                        />
                      </div>
                    </div>
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
                      type="submit"
                      onClick={saveNote}
                      data-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Save changes
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
