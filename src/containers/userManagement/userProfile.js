import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Upload from "../ui/upload";
import { onSaveUserInfo } from "../../actions/users/saveUserInfoAction";
import { Auth, API } from "aws-amplify";
import { updateObject } from "../../util/util";
import { rolesList } from "../../constants";
import Dropdown from "../ui/dropdown";
import validate from "../../util/validation";
import "./userProfile.css";
import { s3Upload } from "../../libs/awsLib";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      file: null,
      userInfo: null,
      isEditable: false,
      userProfileFormError: {
        file: null,
        name: "",
        role: "",
        team: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }
  async componentDidMount() {
    document.title = "User Details - Winwin";
    const { session } = this.props;
    if (!session || !session.user || !session.isAuthenticated) {
      // try {
      //   const profileImage = await this.profileImage();
      //   this.setState({ profileImage });
      // } catch (e) {
      //   alert(e);
      // }
      this.props.history.push("/");
    } else {
      this.setUserInfo();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { session } = this.props;
    if (
      nextProps &&
      nextProps.session &&
      session.user !== nextProps.session.user &&
      nextProps.session.user
    ) {
      this.setState({
        userInfo: nextProps.session.user
      });
    }

    if (nextProps && nextProps.session !== session && !nextProps.session.user) {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      userInfo,
      role,
      userProfileFormError,
      isEditable,
      file
    } = this.state;
    const { session } = this.props;
    let readOnly = isEditable ? "" : "readOnly";
    if (!session || !session.user || !userInfo) {
      return null;
    }
    const propUserInfo = this.props.session.user;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-sm-15 mx-auto my-3">
            {isEditable ? (
              ""
            ) : (
              <div className="row">
                <ul className="action-icons active">
                  <li>
                    <a href="javascript:;" onClick={() => this.editUserInfo()}>
                      <i className="icon-edit" />
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="mb-4">
              <h4>{propUserInfo.name}</h4>
            </div>
            <div className="row">
              <div className="col-13">
                <form>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="text"
                          placeholder="email"
                          className="form-control"
                          onChange={this.onChange}
                          name="email"
                          value={userInfo.email}
                          readOnly="readOnly"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Full Name"
                          className="form-control"
                          onBlur={this.validateField}
                          onChange={this.onChange}
                          name="name"
                          value={userInfo.name}
                          readOnly={readOnly}
                        />
                        {userProfileFormError.name && (
                          <div className="text-danger small">
                            {userProfileFormError.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="role">Role</label>
                        {/* <input
                          id="role"
                          type="text"
                          placeholder="Role"
                          className="form-control"
                          onBlur={this.validateField}
                          onChange={this.onChange}
                          name="role"
                          value={userInfo.role}
                          readOnly={readOnly}
                        /> */}
                        <Dropdown
                          selectedItem={role || userInfo.role}
                          name="role"
                          containerClass="dropdown dropdown-with-searchbox"
                          onChange={this.onDropdownChange.bind(this)}
                          items={rolesList}
                          disabled={readOnly}
                        />
                        {userProfileFormError.role && (
                          <div className="text-danger small">
                            {userProfileFormError.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="team">Team</label>
                        <input
                          id="team"
                          type="text"
                          placeholder="Team"
                          className="form-control"
                          onBlur={this.validateField}
                          onChange={this.onChange}
                          name="team"
                          value={userInfo.team}
                          readOnly={readOnly}
                        />
                        {userProfileFormError.team && (
                          <div className="text-danger small">
                            {userProfileFormError.team}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-8 ml-auto">
                {isEditable && !file ? (
                  <Fragment>
                    <Upload
                      type="image"
                      accept="image/*"
                      onDrop={this.onDrop}
                      text="Upload Photo"
                    />
                  </Fragment>
                ) : file ? (
                  <aside className="thumbsContainer">
                    <div className="thumb" key={file.name}>
                      <div className="thumbInner">
                        <img
                          src={file.preview}
                          alt="Preview"
                          className="previewImg"
                        />
                      </div>
                    </div>
                  </aside>
                ) : (
                  ""
                )}
                {userProfileFormError.file && (
                  <div className="text-danger small">
                    {userProfileFormError.file}
                  </div>
                )}
                {this.renderSelectedFile()}
              </div>
            </div>
            {isEditable ? (
              <div className="row justify-content-center footer-actions active">
                <button
                  className="btn btn-secondary mt-4"
                  onClick={() => this.cancelUserInfo()}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => this.saveUserInfo()}
                >
                  Save
                </button>
              </div>
            ) : (
              ""
            )}
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

  async setUserInfo() {
    const { session } = this.props;
    const currentUser = await Auth.currentAuthenticatedUser({
      bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    const { attributes } = currentUser;
    const userProfileObj = {
      name: attributes["custom:fullName"],
      email: attributes.email,
      role: attributes["custom:role"],
      team: attributes["custom:team"]
    };
    if (session && session.user) {
      this.setState({
        userInfo: updateObject(session.user, userProfileObj)
      });
    }
  }

  onDropdownChange(field, value) {
    const { userInfo = {} } = this.state;
    userInfo.role = value;
    this.setState({ userInfo });
  }

  onChange(e) {
    let userInfo = Object.assign({}, this.state.userInfo, {
      [e.target.name]: e.target.value
    });
    this.setState({ userInfo: userInfo });
  }

  validateField(e) {
    this.validateCreateOrgForm(e.target.name, e.target.value);
  }

  validateCreateOrgForm = (field, value) => {
    const { userProfileFormError: formError } = this.state;
    if (field === "name" || field === "team") {
      if (!value) {
        formError[field] = "This field is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.name(value);
      if (!isValid) {
        formError[field] = "Enter valid name.";
        this.setState({ formError });
        return;
      }
      formError[field] = "";
      this.setState({ formError });
      return;
    }
  };

  editUserInfo() {
    this.setState({
      isEditable: true
    });
  }

  saveUserImage = async () => {
    try {
      const { file } = this.state;
      const attachment = file ? await s3Upload(file) : null;
      this.setState({ profileImage: attachment });
    } catch (e) {
      console.log(e);
    }
  };

  async saveUserInfo() {
    this.setState({
      isEditable: false
    });
    const { userInfo } = this.state;
    await this.saveUserImage();
    this.props.onSaveUserInfo(userInfo, this.state.profileImage);
  }

  cancelUserInfo() {
    const { session } = this.props;
    this.setState({
      isEditable: false,
      userInfo: session.user
    });
  }

  onDrop = (recievedFiles, rejectedFiles) => {
    const { file } = this.state;
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
        this.validateDataFeedForm("file", recievedFiles[key]);
        // this.props.onFileChange(files, deleteImages);
      };
      reader.readAsDataURL(recievedFiles[key]);
    });
  };

  validateDataFeedForm = (field, value) => {
    const { userProfileFormError: formError } = this.state;
    if (field === "file") {
      if (!value) {
        formError.file = "File is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.image(value.name);
      if (!isValid) {
        formError.file =
          "Please select gif or jpg or jpeg or tiff or png file only.";
        this.setState({ formError });
        return;
      }
    }
    // if (!value) {
    //   formError.location = "Location is required.";
    //   this.setState({ formError });
    //   return;
    // }
    // formError.location = "";
    // this.setState({ formError });
    // return;
  };
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  session: state.session,
  dataFeed: state.dataFeed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onSaveUserInfo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
