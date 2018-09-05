import React from 'react';
import DataSetBlock from './dataSetBlock';
import DataSetModal from './dataSetModal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setOrgDataSets, fetchOrgDataSets } from '../../../actions/orgDetail/dataSetAction'
class DataSets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSetList: null,
            selectedData: {
                "name": "",
                "description": "",
                "type": "",
                "url": ""
            },
            modalTitle: ''
        }
    }

    componentDidMount() {
        this.props.fetchOrgDataSets();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.dataSetList) !== JSON.stringify(this.props.dataSetList)) {
            this.setState({
                dataSetList: nextProps.dataSetList
            });
        }
    }

    render() {
        const { dataSetList, selectedData, modalTitle } = this.state;
        const { isDataSetSuccess } = this.props;
        if (!isDataSetSuccess || !dataSetList) { return null; }
        return (
            <section className="dashboard-content p-0 py-3 org-details-container">
                <div className="col-md-18 m-auto card">
                    <div className="col-md-18 m-auto d-flex flex-column py-3">
                        <h3>{this.props.type} Description</h3>
                        <p>Arts center conducts classes on any artistic or cultural topics ranging from ?crafts, dance, singing, painting. Camps for youth and adults and events ?open to the public. They also offer open space for private events.</p>

                        <div className="section-title border-bottom pb-3 mb-3">
                            Data Sets
                        </div>
                        <form>
                            <ul className="list-group list-group-flush">
                                {dataSetList.map(dataSet => <DataSetBlock key={dataSet.id} data={dataSet} changeModalData={this.changeModalData} />)}
                                <li className="list-group-item px-0 pt-4">
                                    <a href="javascript:;" data-toggle="modal" data-target="#dataSetModal" onClick={this.addNewDataSetModal}><i className="icon-add mr-2"></i> Add Another</a>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>

                <DataSetModal modalData={selectedData} title={modalTitle} />

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

    changeModalData = (dataSetId) => {
        const { dataSetList } = this.state;
        this.setState({
            selectedData: dataSetList.filter(data => data.id == dataSetId)[0],
            modalTitle: 'Edit Data Set'
        })
    }

    addNewDataSetModal = () => {
        this.setState({
            selectedData: {
                "name": "",
                "description": "",
                "type": "",
                "url": ""
            },
            modalTitle: 'Add Data Set'
        })
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