import React, { Fragment } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Upload from "../ui/upload";
import { onCreateBulkOrg as onDataFeed } from "../../actions/organization/createBulkOrgAction";
import validate from "../../util/validation";
import { titleCase, formatBytes } from "../../util/util";
import { REACT_APP_BULK_UPLOAD_TEMPLATE_URL } from "../../buildConfig/apiConfig";
import { toast } from "react-toastify";

const message = () => (
  <Fragment>
    <div>Please wait while the upload is in progress.</div>
    <div>We will send you a notification on your registered slack channel.</div>
  </Fragment>
);
class UploadDataFeed extends React.Component {
  state = {
    file: null,
    formError: {
      file: null
    }
  };
  componentDidMount() {
    document.title = "Upload Data Feed - WinWin";
  }
  componentWillReceiveProps(nextProps) {
    const { dataFeed } = this.props;
    if (nextProps.dataFeed !== dataFeed && nextProps.dataFeed.data) {
      if (!nextProps.dataFeed.error) {
        this.setState({
          file: null
        });
        this.props.changePage();
      }
    }
  }

  render() {
    const { formError, file } = this.state;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-sm-12 mx-auto my-3">
            <div className="d-flex align-content-center">
              <div className="mt-1">File Selection</div>
              <a
                className="btn btn-primary ml-auto"
                href={REACT_APP_BULK_UPLOAD_TEMPLATE_URL}
              >
                Download Template
              </a>
            </div>

            <hr />
            <Upload
              type="file"
              name="file"
              onDrop={this.onDrop}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              text=".csv files only"
            />
            {formError.file && (
              <div className="text-danger small">{formError.file}</div>
            )}
            {this.renderSelectedFile()}
            <button
              className="btn btn-link w-50 mt-4"
              onClick={this.props.history.goBack}
            >
              Cancel
            </button>
            <button
              className="btn btn-lg btn-primary w-50 mt-4 cursor-not-allowed"
              onClick={this.onDataFeed}
              disabled={!file || formError.file}
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
      var newFile = file.get("file");
      return (
        <div className="upload-image-wrap d-flex flex-wrap mb-4">
          <div className="col-sm-22">
            <a href={newFile.preview}>{titleCase(newFile.name)}</a>
          </div>
          <div className="col-sm-2">
            <span className="icon-close" onClick={this.dropFile} />
          </div>
          <div className="col">{formatBytes(newFile.size)}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  dropFile = () => {
    this.setState({ file: null, formError: { file: null } });
  };

  onDrop = (recievedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length) {
      this.validateDataFeedForm("file", rejectedFiles[0]);
    }
    if (!rejectedFiles || !rejectedFiles.length) {
      this.validateDataFeedForm("file", recievedFiles[0]);
    }
    const data = new FormData();
    data.append("file", recievedFiles[0]);
    this.setState({ file: data });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDropdownChange = (field, value) => {
    this.setState({ [field]: value });
  };

  validateDataFeedForm = (field, value) => {
    const { formError } = this.state;
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
  };

  onDataFeed = () => {
    const { file } = this.state;
    if (!file) {
      this.validateDataFeedForm("file", file);
      return;
    }
    this.props.onDataFeed({ file });
    //clear file after upload
    this.dropFile();
    //custom notification toaster
    toast.info(message(), {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
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
