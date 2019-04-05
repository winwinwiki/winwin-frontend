import React from "react";
import DataSetBlock from "./dataSetBlock";
import DataSetModal from "./dataSetModal";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchOrgDataSets } from "../../../actions/orgDetail/dataSetAction";
import {
  fetchDataSetCategories,
  deleteOrgDataSet
} from "../../../actions/orgDetail/dataSetCategoriesAction";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
class DataSets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSetList: null,
      dataSetToBeDeleted: "",
      selectedData: {
        name: "",
        description: "",
        type: "",
        url: ""
      },
      modalTitle: ""
    };
  }

  componentDidMount() {
    const { orgId, type } = this.props;
    this.props.startLoaderAction();
    this.props.fetchOrgDataSets(orgId, type);
    this.props.fetchDataSetCategories(orgId, type);
  }

  componentWillReceiveProps(nextProps) {
    const { dataset } = this.props;
    if (nextProps.dataset.data !== dataset.data && nextProps.dataset.data) {
      if (!nextProps.dataset.error) {
        this.setState({
          dataSetList: nextProps.dataset.data.response
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataset !== this.props.dataset && this.props.dataset.data) {
      this.props.stopLoaderAction();
    }
  }

  render() {
    const { dataSetList, selectedData, modalTitle } = this.state;
    const { dataset, datasetCategories } = this.props;
    if (dataset.error || !dataSetList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>
              Arts center conducts classes on any artistic or cultural topics
              ranging from ?crafts, dance, singing, painting. Camps for youth
              and adults and events ?open to the public. They also offer open
              space for private events.
            </p>

            <div className="section-title border-bottom pb-3 mb-3">
              Data Sets
            </div>
            <form>
              <ul className="list-group list-group-flush">
                {dataSetList.map(dataSet => (
                  <DataSetBlock
                    key={dataSet.id}
                    data={dataSet}
                    changeModalData={this.changeModalData}
                    selectedDataSetId={this.selectedDataSetId}
                  />
                ))}
                <li className="list-group-item px-0 pt-4">
                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#dataSetModal"
                    onClick={this.addNewDataSetModal}
                  >
                    <i className="icon-add mr-2" /> Add Another
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>

        <DataSetModal
          dataSetList={dataSetList}
          type={this.props.type}
          orgId={this.props.orgId}
          modalData={selectedData}
          title={modalTitle}
          categoriesList={datasetCategories}
          newModalData={this.handleNewModalData}
        />

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="dashboard-container">
                <div className="dashboard-header">
                  <div className="modal-header flex-column">
                    <div className="d-flex w-100 p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Alert!
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body dashboard-content">
                  Are you sure you want to delete this record?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-primary"
                    onClick={() => this.handleDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  handleNewModalData = newModalData => {
    const { dataSetList, selectedData } = this.state;
    const newList = [...dataSetList, newModalData];
    this.setState({
      dataSetList: newList
    });
  };

  selectedDataSetId = id => {
    id && this.setState({ dataSetToBeDeleted: id });
  };

  handleDelete = () => {
    const { dataSetToBeDeleted: dataSetId, dataSetList } = this.state;
    const { orgId, type } = this.props;
    this.props.deleteOrgDataSet({ orgId, dataSetId, type });
    const filteredList = dataSetList.filter(x => x.id !== dataSetId);
    this.setState({ dataSetList: filteredList });
  };

  changeModalData = dataSetId => {
    const { dataSetList } = this.state;
    this.setState({
      selectedData: dataSetList.filter(data => data.id === dataSetId)[0],
      modalTitle: "Edit Data Set"
    });
  };

  addNewDataSetModal = () => {
    this.setState({
      selectedData: {
        organizationDataSetCategory: { categoryName: "" },
        description: "",
        type: "",
        url: ""
      },
      modalTitle: "Add Data Set"
    });
  };
}

const mapStateToProps = state => ({
  dataset: state.dataset,
  datasetCategories: state.datasetCategories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgDataSets,
      fetchDataSetCategories,
      deleteOrgDataSet,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSets);
