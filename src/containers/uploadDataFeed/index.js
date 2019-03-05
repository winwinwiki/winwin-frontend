import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Geosuggest from "react-geosuggest";

import Dropdown from "../ui/dropdown";
import Upload from "../ui/upload";
import { onDataFeed } from "../../actions/dataFeed/dataFeedAction";
import validate from "../../util/validation";
const sectoryList = ["Public", "Private", "Social"];
const fileSourceList = ["IRS", "Other"];

class UploadDataFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      sector: sectoryList[0],
      fileSource: fileSourceList[0],
      location: null,
      formError: {
        file: null,
        location: null
      }
    };
    this._geoSuggest = null;
    this.onChange = this.onChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.onDataFeed = this.onDataFeed.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.validateLocationField = this.validateLocationField.bind(this);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    const { dataFeed } = this.props;
    if (nextProps.dataFeed !== dataFeed && nextProps.dataFeed.data) {
      if (!nextProps.dataFeed.error) {
        this.setState({
          file: null,
          sector: sectoryList[0],
          fileSource: fileSourceList[0],
          location: null
        });
        this.props.changePage();
      }
    }
  }

  render() {
    const { sector, fileSource, formError } = this.state;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-sm-12 mx-auto my-3">
            <p>Basic Information</p>
            <hr />
            <Geosuggest
              ref={el => (this._geoSuggest = el)}
              placeholder="Search State/County/City/District"
              className="form-control position-relative"
              initialValue=""
              fixtures={[]}
              onBlur={this.validateLocationField}
              onSuggestSelect={this.onSuggestSelect}
            />
            {formError.location && (
              <div className="text-danger small">{formError.location}</div>
            )}
            <div className="my-3">
              <Dropdown
                selectedItem={sector}
                name="sector"
                containerClass="dropdown dropdown-with-searchbox"
                onChange={this.onDropdownChange.bind(this)}
                items={sectoryList}
              />
            </div>
            <p>File Selection</p>
            <hr />
            <Upload
              type="file"
              onDrop={this.onDrop}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              text=".csv or .xls files only"
            />
            {formError.file && (
              <div className="text-danger small">{formError.file}</div>
            )}
            {this.renderSelectedFile()}
            <div className="my-3">
              <Dropdown
                selectedItem={fileSource}
                name="fileSource"
                containerClass="dropdown dropdown-with-searchbox"
                onChange={this.onDropdownChange.bind(this)}
                items={fileSourceList}
              />
            </div>
            <button
              className="btn btn-link w-50 mt-4"
              onClick={this.props.history.goBack}
            >
              Cancel
            </button>
            <button
              className="btn btn-lg btn-primary w-50 mt-4"
              onClick={this.onDataFeed}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderSelectedFile = () => {
    const { file } = this.state;
    if (file) {
      return (
        <div className="upload-image-wrap d-flex flex-wrap mb-4">
          <div className="col-sm-22">
            <a href={file.preview}>{file.name}</a>
          </div>
          <div className="col-sm-2">
            <span className="icon-close" onClick={this.dropFile} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  dropFile = () => {
    this.setState({ file: null });
  };

  onDrop = (recievedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length) {
      // this.setState({ dropError: true });
    }
    if (!rejectedFiles || !rejectedFiles.length) {
      // this.setState({ dropError: false });
    }
    Object.keys(recievedFiles).forEach(key => {
      let reader = new FileReader();
      reader.onload = () => {
        this.setState({ file: recievedFiles[key] });
        this.props.validateDataFeedForm("file", recievedFiles[key]);
        // this.props.onFileChange(files, deleteImages);
      };
      reader.readAsDataURL(recievedFiles[key]);
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDropdownChange(field, value) {
    this.setState({ [field]: value });
  }

  validateField(e) {
    this.validateDataFeedForm(e.target.name, e.target.value);
  }

  validateLocationField(location) {
    this.validateDataFeedForm("location", location);
  }

  validateDataFeedForm = (field, value) => {
    const { formError } = this.props;
    if (field === "file") {
      if (!value) {
        formError.file = "File is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.file(value);
      if (!isValid) {
        formError.file = "Please select .csv or .xls file only.";
        this.setState({ formError });
        return;
      }
    }
    if (!value) {
      formError.location = "Location is required.";
      this.setState({ formError });
      return;
    }
    formError.location = "";
    this.setState({ formError });
    return;
  };

  onDataFeed() {
    const { file, location, sector, fileSource } = this.state;
    if (!file || !location) {
      this.validateDataFeedForm("file", file);
      this.validateDataFeedForm("location", location);
      return;
    }
    this.props.onDataFeed({ file, location, sector, fileSource });
  }

  onSuggestSelect(suggest) {
    this.props.validateDataFeedForm("location", suggest);
    this.setState({
      location: suggest
    });
  }
}

const mapStateToProps = state => ({
  dataFeed: state.dataFeed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/organizations"),
      onDataFeed
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDataFeed);
