import React from 'react';
const addProgram = (props) => {
    return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="programName">Program Name</label>
                                    <input type="text" className="form-control" id="programName" placeholder="Enter Program Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="description">Program Description</label>
                                    <textarea className="form-control" name="" id="description" rows="5" placeholder="Enter Program Description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center footer-actions">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default addProgram;