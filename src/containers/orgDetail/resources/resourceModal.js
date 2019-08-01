import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { compareStrings } from "../../../util/util";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validate from "../../../util/validation";
import { saveOrgResource } from "../../../actions/orgDetail/resourcesAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import { PROGRAM } from "../../../constants";

const getSuggestionValue = suggestion => suggestion.categoryName;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.categoryName}</div>;
class ResourceModal extends Component {
  state = {
    value: "",
    suggestions: [],
    modalData: {
      count: "",
      description: "",
      resourceCategory: { categoryName: "" }
    },
    formError: {
      count: "",
      description: "",
      resourceCategory: { categoryName: "" }
    }
  };

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props;
    if (nextProps.modalData.id !== modalData.id && nextProps.modalData) {
      this.setState({
        modalData: cloneDeep(nextProps.modalData),
        categories:
          nextProps.categoriesList.data &&
          nextProps.categoriesList.data.response
      });
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const {
      categoriesList: { data: { response: categoriesList = [] } = {} } = {}
    } = this.props;

    return inputLength === 0
      ? []
      : categoriesList.filter(
          category =>
            category.categoryName.toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  };

  //onchange for autosuggest
  onChange = (event, { newValue }) => {
    const { modalData } = this.state;
    const {
      categoriesList: { data: { response: categoriesList = [] } = {} } = {}
    } = this.props;

    modalData.resourceCategory.categoryName = newValue;

    //find id in categories list to be updated
    let filteredCategory = categoriesList.find(x => {
      return x.categoryName === newValue ? x : "";
    });
    if (filteredCategory && filteredCategory.id)
      modalData.resourceCategory.id = filteredCategory.id;
    else modalData.resourceCategory.id = -1;
    this.setState({ modalData, value: newValue });
  };

  // input fields onchange method
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const { modalData } = this.state;
    if (name === "categoryName") modalData.resourceCategory[name] = value;
    else modalData[name] = value;
    this.setState({ modalData });
  };

  saveResource = e => {
    e.preventDefault();
    const {
      modalData,
      formError: { count, resourceCategory: { categoryName } } = {}
    } = this.state;
    const { orgId, type } = this.props;
    if (!modalData.resourceCategory.categoryName) {
      this.validateResourceForm(
        "Resource",
        modalData.resourceCategory.categoryName
      );
      return;
    } else if (categoryName !== "" || count !== "") {
      return;
    }
    this.props.toggle();
    if (!modalData.organizationId) modalData.organizationId = orgId;
    if (this.props.type === PROGRAM) {
      modalData.programId = this.props.programId;
    }
    this.props.saveOrgResource(modalData, type);
    this.setState({
      modalData: {
        count: "",
        description: "",
        resourceCategory: { categoryName: "" }
      }
    });
  };

  validateField = e => {
    this.validateResourceForm(e.target.name, e.target.value);
  };

  validateResourceForm = (field, value) => {
    const { formError } = this.state;

    if (field === "Resource") {
      if (!value) {
        formError.resourceCategory.categoryName = "Resource name is required.";
        this.setState({ formError });
        return;
      }
      formError.resourceCategory.categoryName = "";
      this.setState({ formError });
      return;
    }
    if (field === "count") {
      let isValid = validate.number(value);
      if (!isValid) {
        formError.count = "Number is expected.";
        this.setState({ formError });
        return;
      }
      formError.count = "";
      this.setState({ formError });
      return;
    }
  };

  onClose = () => {
    this.setState({
      formError: {
        count: "",
        description: "",
        resourceCategory: { categoryName: "" }
      },
      modalData: cloneDeep(this.props.modalData)
    });
    this.props.toggle();
  };

  render() {
    const { title } = this.props;
    const {
      suggestions,
      modalData: {
        description,
        count,
        resourceCategory: { categoryName, id } = {}
      } = {},
      formError
    } = this.state;
    const inputProps = {
      id,
      name: "Resource",
      placeholder: "Enter Resource Name",
      value: categoryName || "", //input prop value should always be string
      onChange: this.onChange,
      onBlur: this.validateField
    };
    return (
      <Modal
        isOpen={this.props.showModal}
        fade={true}
        toggle={() => this.props.toggle()}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>
          <div className="d-flex w-100 p-3">
            <h5 className="modal-title" id="ResourceModalLabel">
              {title}
            </h5>
          </div>
        </ModalHeader>
        <ModalBody className="dashboard-content">
          <form action="">
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="new-category">Resource Name</label>
                      <Autosuggest
                        id="categoryName"
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={
                          this.onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          this.onSuggestionsClearRequested
                        }
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                      />
                      {formError.resourceCategory.categoryName && (
                        <small className="form-element-hint text-danger">
                          {formError.resourceCategory.categoryName}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="new-count">Count</label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-count"
                        name="count"
                        placeholder="Enter Count"
                        value={count}
                        onBlur={this.validateField}
                        onChange={this.handleChange}
                      />
                      {formError.count && (
                        <div className="text-danger small">
                          {formError.count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
                        id="description"
                        name="description"
                        rows="5"
                        value={description}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.saveResource}>
            Save changes
          </Button>{" "}
        </ModalFooter>
      </Modal>
      // <div
      //   className="modal fade"
      //   id="resourceModal"
      //   tabIndex="-1"
      //   role="dialog"
      //   aria-labelledby="resourceModalLabel"
      //   aria-hidden="true"
      // >
      //   <div className="modal-dialog modal-dialog-centered" role="document">
      //     <div className="modal-content">
      //       <div className="dashboard-container">
      //         <div className="dashboard-header">
      //           <div className="modal-header flex-column">
      //             <div className="d-flex w-100 p-3">
      //               <h5 className="modal-title" id="resourceModalLabel">
      //                 {title}
      //               </h5>
      //               <button
      //                 type="button"
      //                 className="close"
      //                 data-dismiss="modal"
      //                 aria-label="Close"
      //               >
      //                 <span aria-hidden="true">&times;</span>
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="modal-body dashboard-content">
      //           <form action="">
      //             <ul className="list-group list-group-flush">
      //               <li className="list-group-item px-0">
      //                 <div className="row">
      //                   <div className="col">
      //                     <div className="form-group">
      //                       <label htmlFor="new-category">Resource Name</label>
      //                       <Autosuggest
      //                         id="categoryName"
      //                         suggestions={suggestions}
      //                         onSuggestionsFetchRequested={
      //                           this.onSuggestionsFetchRequested
      //                         }
      //                         onSuggestionsClearRequested={
      //                           this.onSuggestionsClearRequested
      //                         }
      //                         getSuggestionValue={getSuggestionValue}
      //                         renderSuggestion={renderSuggestion}
      //                         inputProps={inputProps}
      //                       />
      //                     </div>
      //                   </div>
      //                   <div className="col">
      //                     <div className="form-group">
      //                       <label htmlFor="new-count">Count</label>
      //                       <input
      //                         type="text"
      //                         className="form-control"
      //                         id="new-count"
      //                         name="count"
      //                         placeholder="Enter Count"
      //                         value={count}
      //                         onBlur={this.validateField}
      //                         onChange={this.handleChange}
      //                       />
      //                       {formError.count && (
      //                         <div className="text-danger small">
      //                           {formError.count}
      //                         </div>
      //                       )}
      //                     </div>
      //                   </div>
      //                 </div>
      //                 <div className="row">
      //                   <div className="col">
      //                     <div className="form-group">
      //                       <label htmlFor="description">Description</label>
      //                       <textarea
      //                         className="form-control"
      //                         placeholder="A desription about the resource will go here"
      //                         id="description"
      //                         name="description"
      //                         rows="5"
      //                         value={description}
      //                         onChange={this.handleChange}
      //                       />
      //                     </div>
      //                   </div>
      //                 </div>
      //                 <div className="modal-footer">
      //                   <button
      //                     type="button"
      //                     className="btn btn-secondary"
      //                     data-dismiss="modal"
      //                   >
      //                     Close
      //                   </button>
      //                   <button
      //                     type="button"
      //                     className="btn btn-primary"
      //                     data-dismiss="modal"
      //                     onClick={this.saveResource}
      //                     disabled={!!this.state.formError.count}
      //                   >
      //                     Save changes
      //                   </button>
      //                 </div>
      //               </li>
      //             </ul>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.resourceCategories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgResource
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceModal);
