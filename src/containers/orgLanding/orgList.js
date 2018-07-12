import React from 'react';
import OrgFilters from './orgFilter';
import Dropdown from '../ui/dropdown';

const OrgList = (props) => {
    return (
      <section className="dashboard-content p-0">
      <OrgFilters/>
      <div className="d-flex py-3 align-items-center applied-filters-container">
          <Dropdown/>
          <div className="result-count">
              1,203 organizations found
          </div>
          <div className="applied-filters col align-items-center d-flex">
            <span className="badge badge-pill badge-secondary">Arts &amp; Culture (A20) <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <span className="badge badge-pill badge-secondary">Allison Zimmerman  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <span className="badge badge-pill badge-secondary">Basic Human Need - Opportunity - All  <a href="javascript:;" className=""><i className="icon-close"></i></a></span>
            <a href="javascript:;" className="">+ 2 More</a>
        </div>
          <div className="clear-filters">
              <a href="javascript:;" className="">Clear All Filters</a>
          </div>
      </div>
      <div>
          <table className="table table-bordered table-hover">
              <thead className="thead-light">
              <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="sortable">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <th scope="row">
                      <div className="custom-control custom-checkbox">
                          <input id="customCheckCustom" type="checkbox" className="custom-control-input"/>
                          <label htmlFor="customCheckCustom"className="custom-control-label">&nbsp;</label>
                      </div>
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
              </tr>
              <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
              </tr>
              <tr>
                  <th scope="row">3</th>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird 2</td>
                  <td>@twitter</td>
              </tr>
              <tr>
                  <th scope="row">4</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
              </tr>
              <tr>
                  <th scope="row">5</th>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird 2</td>
                  <td>@twitter</td>
              </tr>
              </tbody>
          </table>
      </div>
  </section>
    )
}

export default OrgList;