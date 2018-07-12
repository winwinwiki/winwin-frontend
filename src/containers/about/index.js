import React from 'react';
import Header from '../header/';
import Filters from '../filters/';
import SectionHeader from '../section-header/';
import Dropdown from '../dropdown/';
import AppliedFilters from '../applied-filters';

export default () => (
    <React.Fragment>
        <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-md">
            <Header/>
        </nav>
        <main role="main" className="dashboard-container">
            <SectionHeader/>
            <section className="dashboard-content p-0">
                <Filters/>
                <div className="d-flex py-3 align-items-center applied-filters-container">
                    <Dropdown/>
                    <div className="result-count">
                        1,203 organizations found
                    </div>
                    <AppliedFilters/>
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
        </main>
    </React.Fragment>
)