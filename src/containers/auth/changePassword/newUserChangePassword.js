import React from "react";
import validate from "../../../util/validation";
import { bindActionCreators } from "redux";
import { onNewUserChangePassword } from "../../../actions/auth/changePasswordAction";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Auth } from "aws-amplify";
import NotificationToaster from "../../ui/notificationToaster";

class NewUserChangePassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    retypeNewPass: "",
    formError: {
      oldPassword: "",
      newPassword: "",
      retypeNewPass: ""
    }
  };

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
    let { retypeNewPass, newPassword, oldPassword, formError } = this.state;
    return (
      <div className="w-100 flex-fill d-flex flex-column justify-content-center">
        <NotificationToaster />
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="oldPassword" className="sr-only">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            aria-describedby="oldPasswordDesc"
            placeholder="Old Password"
            className="form-control"
            onBlur={this.validateField}
            onChange={this.onChange}
            name="oldPassword"
            value={oldPassword}
          />

          {formError.oldPassword && (
            <small className="form-element-hint text-danger">
              {formError.oldPassword}
            </small>
          )}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="newPassword" className="sr-only">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            aria-describedby="newPasswordDesc"
            placeholder="New Password"
            className="form-control"
            onBlur={this.validateField}
            onChange={this.onChange}
            name="newPassword"
            value={newPassword}
          />
          {formError.newPassword && (
            <small className="form-element-hint text-danger">
              {formError.newPassword}
            </small>
          )}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="retypeNewPass" className="sr-only">
            Confirm Password
          </label>
          <input
            id="retypeNewPass"
            type="password"
            aria-describedby="retypeNewPassDesc"
            placeholder="Confirm Password"
            className="form-control"
            onBlur={this.validateField}
            onChange={this.onChange}
            name="retypeNewPass"
            value={retypeNewPass}
          />
          {formError.retypeNewPass && (
            <small className="form-element-hint text-danger">
              {formError.retypeNewPass}
            </small>
          )}
        </div>
        <button
          className="btn btn-lg btn-light w-100 mt-4"
          onClick={this.onSubmit}
        >
          Change Password
        </button>
      </div>
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateField = e => {
    this.validateChangetPasswordForm(e.target.name, e.target.value);
  };

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

  onSubmit = () => {
    const { oldPassword, retypeNewPass, newPassword } = this.state;
    const { location: { state: email } = {} } = this.props;
    if (!retypeNewPass || !newPassword) {
      this.validateChangetPasswordForm("retypeNewPass", retypeNewPass);
      this.validateChangetPasswordForm("newPassword", newPassword);
      return;
    }

    // const currentUser = await Auth.currentAuthenticatedUser();
    this.props.onNewUserChangePassword({
      userName: email,
      password: oldPassword,
      newPassword: newPassword === retypeNewPass ? newPassword : null
    });
  };
}

const mapStateToProps = state => ({
  changePassword: state.changePassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/"),
      onNewUserChangePassword
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserChangePassword);
