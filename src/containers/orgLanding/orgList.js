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
            <a href="javascript:;" className="text-primary">+ 2 More</a>
        </div>
          <div className="clear-filters">
              <a href="javascript:;" className="text-primary">Clear All Filters</a>
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

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
          </button>

          <div className="modal progress-index-modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="dashboard-container">
                          <div className="dashboard-header">
                              <div className="modal-header flex-column">
                                  <div className="d-flex w-100 p-3">
                                      <h5 className="modal-title" id="exampleModalLabel">Social Progress Index</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div className="w-100 border-top">
                                  <div className="w-100 col d-flex align-content-center py-3">
                                      <div className="form-group search mb-0">
                                          <label htmlFor="inputDropdown1" className="sr-only">Search Input</label>
                                          <input id="inputDropdown1" type="search" aria-describedby="emailHelp" placeholder="Search State/Country/City" className="form-control"/>
                                      </div>
                                      <div className="ml-auto">
                                          <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
                                          <button type="button" className="btn btn-primary">Save</button>
                                      </div>
                                  </div>
                                  </div>
                              </div>
                          </div>
                          <div className="modal-body dashboard-content progress-index-options">
                              <div className="d-flex flex-column h-100 pt-4">
                                  <div className="row">
                                      <div className="col">
                                          <h3>Opportunity</h3>
                                      </div>
                                      <div className="col">
                                          <h3>Opportunity</h3>
                                      </div>
                                      <div className="col">
                                          <h3>Opportunity</h3>
                                      </div>
                                  </div>
                                  <div className="row d-flex">
                                      <div className="col">
                                          <p className="border-bottom pb-3">Access to Advance Education</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-1" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-1" className="custom-control-label"> Globally Ranked Universities</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-2" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-2" className="custom-control-label">Inequality in the Attainment of Education</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-3" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-3" className="custom-control-label">Women’s Average Years in School</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-4" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-4" className="custom-control-label">Years of Tertiary Schooling</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Access to Advance Education</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-5" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-5" className="custom-control-label"> Globally Ranked Universities</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-6" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-6" className="custom-control-label">Inequality in the Attainment of Education</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-7" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-7" className="custom-control-label">Women’s Average Years in School</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-8" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-8" className="custom-control-label">Years of Tertiary Schooling</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Access to Advance Education</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-9" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-9" className="custom-control-label"> Globally Ranked Universities</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-10" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-10" className="custom-control-label">Inequality in the Attainment of Education</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-11" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-11" className="custom-control-label">Women’s Average Years in School</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-12" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-12" className="custom-control-label">Years of Tertiary Schooling</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="w-100"></div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-13" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-13" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-14" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-14" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-15" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-15" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-16" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-16" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-17" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-17" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-18" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-18" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-19" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-19" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-20" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-20" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-21" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-21" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-22" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-22" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-23" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-23" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-24" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-24" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-25" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-25" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-26" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-26" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-27" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-27" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="w-100"></div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-28" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-28" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-29" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-29" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-30" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-30" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-31" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-31" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-32" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-32" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-33" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-33" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-34" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-34" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-35" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-35" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-36" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-36" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-37" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-37" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col">
                                          <p className="border-bottom pb-3">Personal Freedom and Choice</p>
                                          <div className="item-list mb-4">
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-38" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-38" className="custom-control-label"> Corruption</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-39" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-39" className="custom-control-label">Early Marriage</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-40" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-40" className="custom-control-label">Freedom of Religion</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-41" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-41" className="custom-control-label">Freedom Over Life Choices</label>
                                              </div>
                                              <div className="custom-control custom-checkbox">
                                                  <input id="customCheckCustom-42" type="checkbox" className="custom-control-input"/>
                                                  <label htmlFor="customCheckCustom-42" className="custom-control-label">Satisfied Demand for Contraception</label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>


                  </div>
              </div>
          </div>
      </div>
  </section>
    )
}

export default OrgList;