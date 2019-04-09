import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { compareStrings } from "../../../util/util";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validate from "../../../util/validation";
import { saveOrgResource } from "../../../actions/orgDetail/resourcesAction";

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
      organizationResourceCategory: { categoryName: "" }
    },
    formError: {
      count: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    const { modalData } = this.props;
    if (
      nextProps.modalData !== modalData &&
      nextProps.modalData &&
      nextProps.categoriesList
    ) {
      if (!nextProps.modalData.error) {
        this.setState({
          modalData: nextProps.modalData,
          categories: nextProps.categoriesList.data.response
        });
      }
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
    console.log(value);
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

    modalData.organizationResourceCategory.categoryName = newValue;

    //find id in categories list to be updated
    let filteredCategory = categoriesList.find(x => {
      return compareStrings(x.categoryName, newValue) ? x : "";
    });
    if (filteredCategory && filteredCategory.id)
      modalData.organizationResourceCategory.id = filteredCategory.id;
    else modalData.organizationResourceCategory.id = -1;
    this.setState({ modalData, value: newValue });
  };

  // input fields onchange method
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const { modalData } = this.state;
    if (name === "categoryName")
      modalData.organizationDataSetCategory[name] = value;
    else modalData[name] = value;
    this.setState({ modalData });
  };

  saveResource = e => {
    e.preventDefault();
    const { modalData } = this.state;
    const { orgId, type, resourcesList } = this.props;
    if (!modalData.organizationId) {
      modalData.organizationId = orgId;
      this.props.newModalData(modalData);
    }
    if (!resourcesList.find(x => x.id === modalData.id))
      this.props.saveOrgResource(modalData, type);
  };

  validateField = e => {
    this.validateAddResourceForm(e.target.name, e.target.value);
  };

  validateAddResourceForm = (field, value) => {
    const { formError } = this.state;

    if (field === "count") {
      let isValid = validate.number(value);
      if (!isValid) {
        formError.count = "Number is expected/required.";
        this.setState({ formError });
        return;
      }
      formError.count = "";
      this.setState({ formError });
      return;
    }
  };

  render() {
    const { title } = this.props;
    const {
      suggestions,
      modalData: {
        description,
        count,
        organizationResourceCategory: { categoryName, id } = {}
      } = {},
      formError
    } = this.state;
    const inputProps = {
      id,
      placeholder: "Enter Resource Name",
      value: categoryName || "", //input prop value should always be string
      onChange: this.onChange
    };
    return (
      <div
        className="modal fade"
        id="resourceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="resourceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="dashboard-container">
              <div className="dashboard-header">
                <div className="modal-header flex-column">
                  <div className="d-flex w-100 p-3">
                    <h5 className="modal-title" id="resourceModalLabel">
                      {title}
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
                              placeholder="A desription about the resource will go here"
                              id="description"
                              name="description"
                              rows="5"
                              value={description}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
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
                          onClick={this.saveResource}
                          disabled={!!this.state.formError.count}
                        >
                          Save changes
                        </button>
                      </div>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgResource
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ResourceModal);
