import React from 'react';
const addProgram = (props) => {
    return(
        <div className="modal progress-index-modal fade bd-example-modal-lg" id="addProgramModal" tabIndex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <div className="modal-header flex-column">
                                <div className="d-flex w-100 p-3">
                                    <h5 className="modal-title" id="exampleModalLabel">New Program</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="w-100 border-top">
                                    <div className="w-100 col d-flex align-content-center py-3">
                                        <div className="ml-auto">
                                            <button type="button" className="btn btn-link"
                                                    data-dismiss="modal">Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body dashboard-content progress-index-options">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="programName">Program Name</label>
                                    <input type="text" className="form-control" id="programName" placeholder="Enter Program Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Program Description</label>
                                    <textarea className="form-control" name="" id="description" rows="5"placeholder="Enter Program Description"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default addProgram;