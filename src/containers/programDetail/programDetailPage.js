import React from 'react';

const ProgramDetailPage = (props) => {
    return (
      <section className="dashboard-content p-0 py-3 program-details-container">
          <div className="col-md-18 m-auto card">
              <div className="col-md-18 m-auto d-flex flex-column py-3">
                  <form>
                      <div className="form-group">
                          <label htmlFor="category">Program Name</label>
                          <input type="text" className="form-control" id="category" placeholder="Enter Category" value="Classes, camps, events and location rentals"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="description">Program Description</label>
                          <textarea className="form-control" name="" id="description" rows="5">Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</textarea>
                      </div>
                  </form>
              </div>
          </div>
      </section>
    )
}

export default ProgramDetailPage;