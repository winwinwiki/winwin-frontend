import React from 'react';

const ProgramDetailPage = (props) => {
    return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <form>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">
                                <div className="row">
                                    <ul className="action-icons active">
                                        <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal"><i className="icon-edit"></i></a></li>
                                    </ul>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="programName">Program Name</label>
                                            <input type="text" className="form-control" id="programName" readOnly="readOnly" placeholder="Enter Program Name" value="Classes, camps, events and location rentals" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="description">Program Description</label>
                                            <textarea className="form-control" name="" id="description" readOnly="readOnly" rows="5">Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProgramDetailPage;