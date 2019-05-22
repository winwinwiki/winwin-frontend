import React from "react";
import ResourceBlock from "./resourceBlock";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  fetchOrgResources,
  deleteOrgResource
} from "../../../actions/orgDetail/resourcesAction";
import { fetchResourceCategories } from "../../../actions/orgDetail/resourceCategoriesAction";
import ResourceModal from "./resourceModal";
import {
  startLoaderAction,
  stopLoaderAction
} from "../../../actions/common/loaderActions";
import { PopupModal } from "../../ui/popupModal";
import { PROGRAM } from "../../../constants";
class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resource: {
        id: "",
        name: ""
      },
      resourcesList: null,
      resourceToBeDeleted: "",
      selectedData: {
        category: "",
        count: "",
        description: ""
      },
      modaltitle: "",
      modal: false
    };
  }

  componentDidMount() {
    const { programId, orgId, type } = this.props;
    this.props.startLoaderAction();
    this.props.fetchOrgResources(type === PROGRAM ? programId : orgId, type);
  }

  componentWillReceiveProps(nextProps) {
    const { resources } = this.props;
    if (
      nextProps.resources.data !== resources.data &&
      nextProps.resources.data
    ) {
      if (!nextProps.resources.error) {
        this.setState({
          resourcesList: nextProps.resources.data.response
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.resources !== this.props.resources &&
      this.props.resources.data
    ) {
      this.props.stopLoaderAction();
    }
  }

  handleNewModalData = newModalData => {
    const { resourcesList } = this.state;
    const newList = [...resourcesList, newModalData];
    this.setState({
      resourcesList: newList
    });
  };

  selectedResource = resource => {
    this.setState({
      resource: {
        id: resource.id,
        name: resource.resourceCategory.categoryName
      }
    });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    const { selectedData, modaltitle, resourcesList } = this.state;
    const { resources, resourceCategories } = this.props;
    if (!resources || !resourcesList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <h3>{this.props.type} Description</h3>
            <p>{this.props.description}</p>
            <div className="section-title border-bottom pb-3 mb-3">
              Resources
            </div>
            <form>
              <ul className="list-group list-group-flush">
                {resourcesList.map((resource, index) => (
                  <ResourceBlock
                    key={index}
                    data={resource}
                    changeModalData={this.changeModalData}
                    selectedResource={this.selectedResource}
                  />
                ))}
                <li className="list-group-item px-0 pt-4">
                  <a
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#resourceModal"
                    onClick={this.addNewResourceModal}
                  >
                    <i className="icon-add mr-2" /> Add New Resource
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <ResourceModal
          resourcesList={resourcesList}
          type={this.props.type}
          orgId={this.props.orgId}
          modalData={selectedData}
          title={modaltitle}
          toggle={this.toggle}
          showModal={this.state.modal}
          programId={this.props.programId}
        />
        <PopupModal
          modalid="deleteModal"
          modaltitle="Alert!"
          modalcontent={`Are you sure you want to delete '${
            this.state.resource.name
          }' ?`}
          primarybuttontext="Delete Resource"
          secondarybuttontext="Cancel"
          handleDelete={() => this.handleDelete()}
        />
      </section>
    );
  }

  handleDelete = () => {
    const { resource: { id: resourceId } = {}, resourcesList } = this.state;
    const { orgId, type, programId } = this.props;
    const filteredList = resourcesList.filter(x => x.id !== resourceId);
    this.props.deleteOrgResource(
      orgId,
      resourceId,
      type,
      filteredList,
      programId
    );
    this.setState({
      selectedData: {
        resourceCategory: { categoryName: "" },
        count: "",
        description: ""
      }
    });
  };

  //when edit resource
  changeModalData = resourceId => {
    const { resourcesList } = this.state;
    const { orgId, programId, type } = this.props;
    this.props.fetchResourceCategories(
      type === PROGRAM ? programId : orgId,
      type
    );
    this.toggle();
    this.setState({
      selectedData: resourcesList.filter(
        resource => resource.id === resourceId
      )[0],
      modaltitle: "Edit Resource"
    });
  };

  //add new resource
  addNewResourceModal = () => {
    const { orgId, programId, type } = this.props;
    this.toggle();
    this.props.fetchResourceCategories(
      type === PROGRAM ? programId : orgId,
      type
    );
    this.setState({
      selectedData: {
        resourceCategory: { categoryName: "" },
        count: "",
        description: ""
      },
      modaltitle: "Add New Resource"
    });
  };
}

const mapStateToProps = state => ({
  resources: state.resources,
  resourceCategories: state.resourceCategories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchOrgResources,
      fetchResourceCategories,
      deleteOrgResource,
      startLoaderAction,
      stopLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources);
