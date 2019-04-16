import React from "react";
import validate from "../../../util/validation";
import { bindActionCreators } from "redux";
import { onChangePassword } from "../../../actions/auth/changePasswordAction";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Auth } from "aws-amplify";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      retypeNewPass: "",
      formError: {
        oldPassword: "",
        newPassword: "",
        retypeNewPass: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { changePassword } = this.props;
    if (
      nextProps &&
      nextProps.changePassword !== changePassword &&
      nextProps.changePassword.data
    ) {
      if (!nextProps.changePassword.error) {
        this.props.changePage();
        this.setState({
          oldPassword: "",
          newPassword: "",
          retypeNewPass: ""
        });
      }
    }
  }

  render() {
    const { firstname, lastname, formError } = this.state;
    let { changePassword } = this.props;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-sm-12 mx-auto my-3">
            <div className="mb-4">
              <h4>
                {firstname} {lastname}
              </h4>
            </div>
            {changePassword.error && <div>{changePassword.data}</div>}
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                      id="oldPassword"
                      type="password"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="oldPassword"
                    />
                    {formError.oldPassword ? (
                      <small className="form-element-hint text-danger">
                        {formError.oldPassword}
                      </small>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="newPassword"
                    />
                    {formError.newPassword ? (
                      <small className="form-element-hint text-danger">
                        {formError.newPassword}
                      </small>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="retypeNewPass">Re-type New Password</label>
                    <input
                      id="retypeNewPass"
                      type="password"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="retypeNewPass"
                    />
                    {formError.retypeNewPass ? (
                      <small className="form-element-hint text-danger">
                        {formError.retypeNewPass}
                      </small>
                    ) : (
                      <div>&nbsp;</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Password must
                  <ul>
                    <li>Be at least 8 characters long</li>
                    <li>Include at least one capital letter (A-Z)</li>
                    <li>Include at least one small letter (a-z)</li>
                    <li>Include at least one number (0-9)</li>
                  </ul>
                </div>
              </div>
            </form>
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
          </div>
        </div>
      </div>
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateField(e) {
    this.validateChangetPasswordForm(e.target.name, e.target.value);
  }

  validateChangetPasswordForm = (field, value) => {
    const { formError, newPassword, retypeNewPass } = this.state;
    if (field === "oldPassword" || field === "newPassword") {
      if (!value) {
        formError[field] = "password is required.";
        this.setState({ formError });
        return;
      }
      // let isValid = validate.password(value);
      // if (!isValid) {
      //   formError[field] = "enter valid password.";
      //   this.setState({ formError });
      //   return;
      // }
      formError[field] = "";
      this.setState({ formError });
      return;
    }
    if (!value) {
      formError[field] = "confirm password is required.";
      this.setState({ formError });
      return;
    }
    let isValidPwd = validate.confirmPassword(newPassword, retypeNewPass);
    if (!isValidPwd) {
      formError[field] = "password does not match";
      this.setState({ formError });
      return;
    }
    formError[field] = "";
    this.setState({ formError });
    return;
  };

  editUserInfo() {
    this.setState({
      isEditable: true
    });
  }

  async saveUserInfo() {
    this.setState({
      isEditable: false
    });
    const { oldPassword, retypeNewPass, newPassword } = this.state;
    if (!retypeNewPass || !newPassword) {
      this.validateChangetPasswordForm("retypeNewPass", retypeNewPass);
      this.validateChangetPasswordForm("newPassword", newPassword);
      return;
    }

    // const currentUser = await Auth.currentAuthenticatedUser();
    this.props.onChangePassword({ oldPassword, newPassword });
  }

  cancelUserInfo() {
    this.setState({
      isEditable: false
    });
  }
}

const mapStateToProps = state => ({
  changePassword: state.changePassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/"),
      onChangePassword
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
