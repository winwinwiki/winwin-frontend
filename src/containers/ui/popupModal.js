import React from "react";

export const PopupModal = ({ handleDelete, ...m }) => {
  return (
    <div
      {...m}
      className="modal fade"
      id={m.modalId}
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
                    {m.modalTitle}
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
            <div className="modal-body dashboard-content">{m.modalContent}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {m.secondaryButtonText}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleDelete}
              >
                {m.primaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
