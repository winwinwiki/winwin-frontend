import React from 'react';

const OrgDetailPage = (props) => {
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
          <div className="col-md-18 m-auto card">
              <div className="col-md-18 m-auto d-flex flex-column py-3">
                  <h3>Organization Description</h3>
                  <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                  <div className="section-title">
                      Data Sets
                  </div>
                  <form>
                      <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <input type="text" className="form-control" id="category" placeholder="Community Involvement Data"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea name="" id="description" rows="5"></textarea>
                      </div>
                      <div className="card custom-list-container">
                          <div className="card-header">
                              Opportunity
                          </div>
                          <div className="card-body">
                              <h5 className="card-title">Special title treatment</h5>
                              <ul className="">
                                  <li>
                                      <span>Tolerence &amp; Inclusion</span>
                                      <ul>
                                          <li><span>Community Safety Net</span></li>
                                          <li><span>Religious Tolerence</span></li>
                                      </ul>
                                  </li>
                                  <li>
                                      <span>Access to Advance education</span>
                                      <ul>
                                          <li><span>Years of Tertiary Schooling</span></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </section>
    )
}

export default OrgDetailPage;