import React from 'react';
const addOrganization = (props) => {
    return (
        <section className="dashboard-content p-0 py-3 org-details-container">
            <div className="col-md-18 m-auto card">
                <div className="col-md-18 m-auto d-flex flex-column py-3">
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="childOrganizationType">Child Organization Type</label>
                                    <input type="text" className="form-control" id="childOrganizationType" placeholder="Enter Program Name" readOnly value={props.history.location.search.replace(/\?/,'')}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="childOrganizationName">Child Organization Name</label>
                                    <input type="text" className="form-control" id="childOrganizationName" placeholder="Enter Child Organization Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center footer-actions active">
                            <button className="btn" onClick={(e) => { e.preventDefault(); props.history.goBack()}}>Cancel</button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default addOrganization;