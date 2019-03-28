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
class Resources extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    await this.props.fetchOrgResources(orgId);
    await this.props.fetchResourceCategories(orgId);
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

  selectedResourceId = id => {
    this.setState({ resourceToBeDeleted: id });
  };

  handleDelete = () => {
    const { resourceToBeDeleted: resourceId, resourcesList } = this.state;
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
            <h3>{this.props.type} Description</h3>
            <p>
              Arts center conducts classes on any artistic or cultural topics
              ranging from ?crafts, dance, singing, painting. Camps for youth
              and adults and events ?open to the public. They also offer open
              space for private events.
            </p>

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
                    selectedResourceId={this.selectedResourceId}
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
          orgId={this.props.orgId}
          modalData={selectedData}
          categoriesList={resourceCategories}
          title={modalTitle}
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
                    className="btn btn-primary"
                    data-dismiss="modal"
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
