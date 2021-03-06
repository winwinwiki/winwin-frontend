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
import { PopupModal } from "../../ui/popupModal";
import { PROGRAM } from "../../../constants";
import Can from "../../Can";
class DataSets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: {
        id: "",
        name: ""
      },
      dataSetList: null,
      dataSetToBeDeleted: "",
      selectedData: {
        name: "",
        description: "",
        type: "",
        url: ""
      },
      modaltitle: "",
      modal: false
    };
  }

  componentDidMount() {
    const { orgId, programId, type } = this.props;
    this.props.startLoaderAction();
    this.props.fetchOrgDataSets(type === PROGRAM ? programId : orgId, type);
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
    const { dataSetList, selectedData, modaltitle } = this.state;
    const { dataset, datasetCategories, session } = this.props;
    if (dataset.error || !dataSetList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>

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
                    selectedDataSet={this.selectedDataSet}
                    session={this.props.session}
                  />
                ))}
                <Can
                  role={session.user && session.user.role}
                  perform="organizationDetailsDataSet:create"
                  yes={() => (
                    <li className="list-group-item px-0 pt-4">
                      <a
                        href="javascript:;"
                        data-toggle="modal"
                        data-target="#dataSetModal"
                        onClick={this.addNewDataSetModal}
                      >
                        <i className="icon-add mr-2" /> Add Data Set
                      </a>
                    </li>
                  )}
                />
              </ul>
            </form>
          </div>
        </div>

        <DataSetModal
          dataSetList={dataSetList}
          type={this.props.type}
          orgId={this.props.orgId}
          programId={this.props.programId}
          modalData={selectedData}
          title={modaltitle}
          toggle={this.toggle}
          showModal={this.state.modal}
        />
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete '${
            this.state.dataSet.name
          }' ?`}
          primarybuttontext="Delete DataSet"
          secondarybuttontext="Cancel"
          handleDelete={() => this.handleDelete()}
        />
      </section>
    );
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  selectedDataSet = dataSet => {
    dataSet &&
      this.setState({
        dataSet: {
          id: dataSet.id,
          name: dataSet.dataSetCategory.categoryName
        }
      });
  };

  handleDelete = () => {
    const { dataSet: { id: dataSetId } = {}, dataSetList } = this.state;
    const { orgId, programId, type } = this.props;
    const filteredList = dataSetList.filter(x => x.id !== dataSetId);
    this.props.deleteOrgDataSet(
      orgId,
      dataSetId,
      type,
      filteredList,
      programId
    );
    this.setState({
      selectedData: {
        dataSetCategory: { categoryName: "" },
        description: "",
        type: "",
        url: ""
      }
    });
  };

  //when edit is clicked
  changeModalData = dataSetId => {
    const { dataSetList } = this.state;
    const { orgId, programId, type } = this.props;
    this.props.fetchDataSetCategories(
      type === PROGRAM ? programId : orgId,
      type
    );
    this.toggle();
    this.setState({
      selectedData: dataSetList.filter(data => data.id === dataSetId)[0],
      modaltitle: "Edit Data Set"
    });
  };

  //when add new is clicked
  addNewDataSetModal = () => {
    this.toggle();
    const { orgId, programId, type } = this.props;
    this.props.fetchDataSetCategories(
      type === PROGRAM ? programId : orgId,
      type
    );
    this.setState({
      selectedData: {
        dataSetCategory: { categoryName: "" },
        description: "",
        type: "",
        url: ""
      },
      modaltitle: "Add Data Set"
    });
  };
}

const mapStateToProps = state => ({
  dataset: state.dataset,
  datasetCategories: state.datasetCategories,
  session: state.session
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
