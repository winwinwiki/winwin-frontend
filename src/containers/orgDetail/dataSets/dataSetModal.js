import React from 'react';

const DataSetModal = (props) => {
    return (
        <div className="modal fade" id="dataSetModal" tabIndex="-1" role="dialog" aria-labelledby="dataSetModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <div className="modal-header flex-column">
                                <div className="d-flex w-100 p-3">
                                    <h5 className="modal-title" id="dataSetModalLabel">{props.title}</h5>
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
                                                    <label htmlFor="new-dataSetName">Data Set Name</label>
                                                    <input type="text" className="form-control" id="new-dataSetName" placeholder="Enter Category" value={props.modalData.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="new-description">Description</label>
                                                    <textarea className="form-control" name="" id="new-description" rows="5" placeholder="A desription about data set will go here" value={props.modalData.description}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="type">Type</label><br />
                                                    <div className="btn-group btn-group-toggle mb-4" id="type" data-toggle="buttons">
                                                        <label className={`btn btn-outline-secondary ${props.modalData.type=="open"? 'active': ''}`}>
                                                            <input type="radio" name="options" id="openType" autoComplete="off" checked={props.modalData.type=="open"? true: false}/> Open
                                                                </label>
                                                        <label className={`btn btn-outline-secondary ${props.modalData.type=="closed"? 'active': ''}`}>
                                                            <input type="radio" name="options" id="closedType" autoComplete="off" checked={props.modalData.type=="closed"? true: false}/> Closed
                                                                </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="new-url">URL</label>
                                                    <input type="text" className="form-control" id="new-url" placeholder="Website URL" value={props.modalData.url} />
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

export default DataSetModal;