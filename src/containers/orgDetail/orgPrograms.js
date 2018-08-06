import React from 'react';

const OrgPrograms = (props) => {
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
          <div className="col-md-18 m-auto card">
              <div className="col-md-18 m-auto d-flex flex-column py-3">
                  <div className="row mb-4">
                      <div className="col">
                          <div className="form-group search mb-0">
                              <label htmlFor="inputDropdown1" className="sr-only">Search program</label>
                              <input id="inputDropdown1" type="search" aria-describedby="emailHelp"
                                     placeholder="Search by name"
                                     className="form-control"/>
                          </div>
                      </div>
                      <div className="col col-md-auto">
                          <a href="javascript:;" className="btn btn-primary">Add Program</a>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col">
                          <div className="list-group">
                              <a href="#" className="list-group-item list-group-item-action">
                                  Cras justo odio
                              </a>
                              <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                              <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
                              <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                              <a href="#" className="list-group-item list-group-item-action">Vestibulum at
                                  eros</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    )
}

export default OrgPrograms;