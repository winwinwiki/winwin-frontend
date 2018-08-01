import React from 'react';

const DataSets = (props) => {
    return (
        <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
            <div className="col-md-18 m-auto d-flex flex-column py-3">
                <h3>Organization Description</h3>
                <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                <div className="section-title border-bottom pb-3 mb-3">
                    Resources
                </div>
                <form>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                            <div className="row">
                                <ul className="action-icons">
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i className="icon-edit"></i></a></li>
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#deleteModal"><i className="icon-delete"></i></a></li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input type="text" className="form-control" id="category" readOnly="readOnly" placeholder="Enter Category" value="Theaters"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="count">Count</label>
                                        <input type="text" className="form-control" id="count" readOnly="readOnly" placeholder="Count" value="1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" name="" id="description" readOnly="readOnly" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item px-0">
                            <div className="row">
                                <ul className="action-icons">
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i className="icon-edit"></i></a></li>
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#deleteModal"><i className="icon-delete"></i></a></li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input type="text" className="form-control" id="category" readOnly="readOnly" placeholder="Enter Category" value="Event Space"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="count">Count</label>
                                        <input type="text" className="form-control" id="count" readOnly="readOnly" placeholder="Count" value=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" name="" id="description" readOnly="readOnly" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item px-0">
                            <div className="row">
                                <ul className="action-icons">
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i className="icon-edit"></i></a></li>
                                    <li><a href="javascript:;" data-toggle="modal" data-target="#deleteModal"><i className="icon-delete"></i></a></li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input type="text" className="form-control" id="category" readOnly="readOnly" placeholder="Enter Category" value="Musicians"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="count">Count</label>
                                        <input type="text" className="form-control" id="count" readOnly="readOnly" placeholder="Count" value=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" name="" id="description" readOnly="readOnly" rows="5">The Organization is dedicated to the community to provide a variety of challenging and newartistic programming through its school of the arts, dance studio, adult and children's performance programming, special events, and education</textarea>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item px-0 pt-4">
                            <a href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i className="icon-add mr-2"></i> Add Another</a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <div className="modal-header flex-column">
                                <div className="d-flex w-100 p-3">
                                    <h5 className="modal-title" id="exampleModalLabel">Page title</h5>
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
                                                    <input type="text" className="form-control" id="new-category" placeholder="Enter Category" value=""/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="new-count">Count</label>
                                                    <input type="text" className="form-control" id="new-count" placeholder="Enter Count" value=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea className="form-control" placeholder="A desription about the resource will go here" name="" id="description" rows="5"></textarea>
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

        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <div className="modal-header flex-column">
                                <div className="d-flex w-100 p-3">
                                    <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body dashboard-content">
                            Are you sure you want to delete this record?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default DataSets;