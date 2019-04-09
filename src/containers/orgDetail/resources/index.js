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
      modalTitle: ""
    };
  }

  async componentDidMount() {
    this.props.startLoaderAction();
    const orgId = await this.props.orgId;
    await this.props.fetchOrgResources(orgId, this.props.type);
    await this.props.fetchResourceCategories(orgId, this.props.type);
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
        name: resource.organizationResourceCategory.categoryName
      }
    });
  };

  handleDelete = () => {
    const { resource: { id: resourceId } = {}, resourcesList } = this.state;
    const { orgId } = this.props;
    this.props.deleteOrgResource({ orgId, resourceId });
    const filteredList = resourcesList.filter(x => x.id !== resourceId);
    this.setState({ resourcesList: filteredList });
  };

  render() {
    const { selectedData, modalTitle, resourcesList } = this.state;
    const { resources, resourceCategories } = this.props;
    if (!resources || !resources.data || resources.error || !resourcesList) {
      return null;
    }
    return (
      <section className="dashboard-content p-0 py-3 org-details-container">
        <div className="col-md-18 m-auto card">
          <div className="col-md-18 m-auto d-flex flex-column py-3">
            <div className="section-title border-bottom pb-3 mb-3">
              Resources
            </div>
            <form>
              <ul className="list-group list-group-flush">
                {resourcesList.map(resource => (
                  <ResourceBlock
                    key={resource.id}
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
                    <i className="icon-add mr-2" /> Add Another
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
          categoriesList={resourceCategories}
          title={modalTitle}
          newModalData={this.handleNewModalData}
        />
        <PopupModal
          modalId="deleteModal"
          modalTitle="Alert!"
          modalContent={`Are you sure you want to delete '${
            this.state.resource.name
          }' ?`}
          primaryButtonText="Delete Resource"
          secondaryButtonText="Cancel"
          handleDelete={() => this.handleDelete(this.state.resource.id)}
        />
      </section>
    );
  }
  changeModalData = resourceId => {
    const { resourcesList } = this.state;
    this.setState({
      selectedData: resourcesList.filter(
        resource => resource.id === resourceId
      )[0],
      modalTitle: "Edit Resource"
    });
  };

  addNewResourceModal = () => {
    this.setState({
      selectedData: {
        organizationResourceCategory: { categoryName: "" },
        count: "",
        description: ""
      },
      modalTitle: "Add New Resource"
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
