import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveOrgDataSets } from "../../../actions/orgDetail/dataSetAction";
import Autosuggest from "react-autosuggest";
import { compareStrings } from "../../../util/util";

const getSuggestionValue = suggestion => suggestion.categoryName;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.categoryName}</div>;
class DataSetModal extends Component {
  state = {
    value: "",
    suggestions: [],
    modalData: {
      type: "",
      url: "",
      organizationDataSetCategory: { categoryName: "" }
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

  saveDataSet = e => {
    e.preventDefault();
    const { modalData } = this.state;
    const { orgId } = this.props;
    if (!modalData.organizationId) {
      modalData.organizationId = orgId;
      this.props.newModalData(modalData);
    }
    this.props.saveOrgDataSets(modalData);
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

  // Dropdowns onchange method
  handleOptionsChange = e => {
    let name = e.target.children[0].name;
    const { modalData } = this.state;
    if (name === "type") modalData[name] = e.target.children[0].value;
    this.setState({ modalData });
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

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  //autosuggest onchange handler
  onChange = (event, { newValue }) => {
    const { modalData } = this.state;
    const {
      categoriesList: { data: { response: categoriesList = [] } = {} } = {}
    } = this.props;

    modalData.organizationDataSetCategory.categoryName = newValue;

    //find id in categories list to be updated
    let catId = categoriesList.find(x => {
      return compareStrings(x.categoryName, newValue) ? x : "";
    }).id;
    modalData.organizationDataSetCategory.id = catId;
    this.setState({ modalData, value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const {
      modalData: {
        description,
        type,
        url,
        organizationDataSetCategory: { categoryName, id } = {}
      } = {}
    } = this.state;
    const { title } = this.props;

    const inputProps = {
      id,
      placeholder: "Enter Data Set Name",

      value: categoryName,
      onChange: this.onChange
    };
    return (
      <div
        className="modal fade show"
        id="dataSetModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="dataSetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="dashboard-container">
              <div className="dashboard-header">
                <div className="modal-header flex-column">
                  <div className="d-flex w-100 p-3">
                    <h5 className="modal-title" id="dataSetModalLabel">
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
                <form>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="new-dataSetName">
                              Data Set Name
                            </label>
                            {/* <input
                              type="text"
                              className="form-control"
                              id="new-dataSetName"
                              name="categoryName"
                              placeholder="Enter Data Set Name"
                              onChange={this.handleChange}
                              value={categoryName}
                            /> */}
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
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="new-description">Description</label>
                            <textarea
                              className="form-control"
                              id="new-description"
                              name="description"
                              rows="5"
                              onChange={this.handleChange}
                              placeholder="A desription about data set will go here"
                              value={description}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <br />
                            <div
                              className="btn-group btn-group-toggle mb-4"
                              id="type"
                              data-toggle="buttons"
                            >
                              <label
                                onClick={this.handleOptionsChange}
                                className={`btn btn-outline-secondary ${
                                  type.toLowerCase() === "open" ? "active" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="type"
                                  value="open"
                                  checked={type.toLowerCase() === "open"}
                                />{" "}
                                Open
                              </label>
                              <label
                                onClick={this.handleOptionsChange}
                                className={`btn btn-outline-secondary ${
                                  type.toLowerCase() === "closed"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="type"
                                  value="closed"
                                  checked={type.toLowerCase() === "closed"}
                                />{" "}
                                Closed
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="new-url">URL</label>
                            <input
                              type="text"
                              className="form-control"
                              id="new-url"
                              name="url"
                              onChange={this.handleChange}
                              placeholder="Website URL"
                              value={url}
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
                          type="submit"
                          onClick={this.saveDataSet}
                          data-dismiss="modal"
                          className="btn btn-primary"
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
      saveOrgDataSets
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(DataSetModal);
