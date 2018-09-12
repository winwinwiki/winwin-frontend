import React from 'react';

const ResourceModal = (props) => {
    return (
        <div className="modal fade" id="resourceModal" tabIndex="-1" role="dialog" aria-labelledby="resourceModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <div className="modal-header flex-column">
                                <div className="d-flex w-100 p-3">
                                    <h5 className="modal-title" id="resourceModalLabel">{props.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body dashboard-content">
                            <form action="">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item px-0">
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="new-category">Category</label>
                                                    <input type="text" className="form-control" id="new-category" placeholder="Enter Category" value={props.modalData.category}/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="new-count">Count</label>
                                                    <input type="text" className="form-control" id="new-count" placeholder="Enter Count" value={props.modalData.count}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea className="form-control" placeholder="A desription about the resource will go here" name="" id="description" rows="5" value={props.modalData.description}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResourceModal;