import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveOrgDataSets } from "../../../actions/orgDetail/dataSetAction";
import Autosuggest from "react-autosuggest";
import { compareStrings } from "../../../util/util";
import { fetchDataSetCategories } from "../../../actions/orgDetail/dataSetCategoriesAction";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import cloneDeep from "lodash/cloneDeep";
import { PROGRAM } from "../../../constants";

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
      dataSetCategory: { categoryName: "" }
    },
    formError: {
      type: "",
      url: "",
      dataSetCategory: { categoryName: "" }
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

  saveDataSet = e => {
    e.preventDefault();
    const {
      modalData,
      formError: { dataSetCategory: { categoryName } } = {}
    } = this.state;
    const { orgId, type } = this.props;

    if (!modalData.dataSetCategory.categoryName) {
      this.validateDataSetForm(
        "DataSet",
        modalData.dataSetCategory.categoryName
      );
      return;
    } else if (!modalData.type) {
      this.validateDataSetForm("type", modalData.type);
      return;
    } else if (categoryName !== "") {
      return;
    }
    this.props.toggle();
    if (!modalData.organizationId) modalData.organizationId = orgId;
    if (this.props.type === PROGRAM) {
      modalData.programId = this.props.programId;
    }
    this.props.saveOrgDataSets(modalData, type);
    this.setState({
      modalData: {
        type: "",
        url: "",
        dataSetCategory: { categoryName: "" }
      }
    });
  };

  // input fields onchange method
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const { modalData } = this.state;
    if (name === "categoryName") modalData.dataSetCategory[name] = value;
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

    modalData.dataSetCategory.categoryName = newValue;

    //find id in categories list to be updated
    let filteredCategory = categoriesList.find(x => {
      return x.categoryName === newValue ? x : "";
    });
    if (filteredCategory && filteredCategory.id && filteredCategory.id !== -1)
      modalData.dataSetCategory.id = filteredCategory.id;
    else modalData.dataSetCategory.id = -1;
    this.setState({ modalData, value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  validateForm = e => {
    this.validateDataSetForm(e.target.name, e.target.value);
  };

  validateDataSetForm = (field, value) => {
    const { formError } = this.state;
    if (field === "DataSet") {
      if (!value) {
        formError.dataSetCategory.categoryName = "DataSet name is required.";
        this.setState({ formError });
        return;
      }
      formError.dataSetCategory.categoryName = "";
      this.setState({ formError });
      return;
    }
    if (field === "type") {
      if (!value) {
        formError.type = "DataSet type is required.";
        this.setState({ formError });
        return;
      }
      formError.type = "";
      this.setState({ formError });
      return;
    }
  };

  onClose = () => {
    this.setState({
      formError: {
        type: "",
        url: "",
        dataSetCategory: { categoryName: "" }
      },
      modalData: cloneDeep(this.props.modalData)
    });
    this.props.toggle();
  };

  render() {
    const { suggestions, formError } = this.state;
    const {
      modalData: {
        description,
        type,
        url,
        dataSetCategory: { categoryName, id } = {}
      } = {}
    } = this.state;
    const { title } = this.props;

    const inputProps = {
      id,
      name: "DataSet",
      placeholder: "Enter Data Set Name",
      value: categoryName,
      onChange: this.onChange,
      onBlur: this.validateForm
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
            <h5 className="modal-title" id="dataSetModalLabel">
              {title}
            </h5>
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={e => { e.preventDefault(); }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="new-dataSetName">Data Set Name</label>

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
                      {formError.dataSetCategory.categoryName && (
                        <small className="form-element-hint text-danger">
                          {formError.dataSetCategory.categoryName}
                        </small>
                      )}
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
                        placeholder="Enter Description"
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
                        className="btn-group btn-group-toggle"
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
                            onBlur={this.validateForm}
                            readOnly
                          />{" "}
                          Open
                        </label>
                        <label
                          onClick={this.handleOptionsChange}
                          className={`btn btn-outline-secondary ${
                            type.toLowerCase() === "closed" ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="type"
                            value="closed"
                            checked={type.toLowerCase() === "closed"}
                            onBlur={this.validateForm}
                            readOnly
                          />{" "}
                          Closed
                        </label>
                      </div>
                      <br />
                      {formError.type && (
                        <small className="form-element-hint text-danger">
                          {formError.type}
                        </small>
                      )}
                    </div>
                  </div>
                  {type.toLowerCase() === "open" ? (
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
                  ) : (
                    ""
                  )}
                </div>
              </li>
            </ul>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.saveDataSet}>
            Save changes
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.datasetCategories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveOrgDataSets,
      fetchDataSetCategories
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSetModal);
