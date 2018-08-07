import React from 'react';
import DataSetBlock from './dataSetBlock';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setOrgDataSets, fetchOrgDataSets} from '../../../actions/orgDetail/dataSetAction'
class DataSets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null
        }
    }

    componentDidMount() {
        this.props.fetchOrgDataSets();
    }
    render() {
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>Organization Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title border-bottom pb-3 mb-3">
                            Data Sets
                        </div>
                        <DataSetBlock/>
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
                                                            <input type="text" className="form-control" id="new-category" placeholder="Enter Category" value="" />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label htmlFor="new-count">Count</label>
                                                            <input type="text" className="form-control" id="new-count" placeholder="Enter Count" value="" />
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
}

const mapStateToProps = state => ({
    dataSetList: state.dataset.dataSetList,
    isDataSetSuccess: state.dataset.isDataSetSuccess
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setOrgDataSets,
    fetchOrgDataSets
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataSets);