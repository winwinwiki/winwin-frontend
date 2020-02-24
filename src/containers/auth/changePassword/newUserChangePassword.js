import React, { Fragment } from "react";
import validate from "../../../util/validation";
import { bindActionCreators } from "redux";
import { onNewUserChangePassword } from "../../../actions/auth/changePasswordAction";
import { connect } from "react-redux";
//import { push } from "react-router-redux";
import { push } from 'connected-react-router';
import NotificationToaster from "../../ui/notificationToaster";

const passowordValidation = formError => (
  <small className="form-element-hint text-danger">
    {formError && formError}
  </small>
);

const validationMessages = {
  oldPassword: () =>
    "We've sent a temporary password. Please check your inbox.",
  newPassword: () => (
    <div className="row">
      <div
        className="col"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        Passwords must
        <ul>
          <li>Be at least 8 characters long</li>
          <li>Include at least one capital letter (A-Z)</li>
          <li>Include at least one small letter (a-z)</li>
          <li>Include at least one number (0-9)</li>
          <li>
            Include at least one special character{" "}
            {`{^$*.[]{}()?-"!@#%&/\,><':;|_~`}`}
          </li>
        </ul>
      </div>
    </div>
  ),
  confirmPassword: () => (
    <div className="row">
      <div
        className="col"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        Password must
        <ul>
          <li>Match the new password</li>
          <li>Be at least 8 characters long</li>
          <li>Include at least one capital letter (A-Z)</li>
          <li>Include at least one small letter (a-z)</li>
          <li>Include at least one number (0-9)</li>
          <li>
            Include at least one special character{" "}
            {`{^$*.[]{}()?-"!@#%&/\,><':;|_~`}`}
          </li>
        </ul>
      </div>
    </div>
  ),
  verificationCode: param => (
    <div className="row">
      <div
        className="col"
        style={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        {`A code was sent to your registered email-id: ${param ? param : ""}`}
        <ul>
          <li>
            Once you've recieved your confirmation code, Please enter it here.
          </li>
          <li>This will help confirm your account ownership.</li>
        </ul>
      </div>
    </div>
  ),
  missingEmail: () => "Registered email-address, to reset password"
};

export const validationPopup = (messageType, param) => (
  <Fragment>
    <i
      className="icon-circle-question custom-icon cursor-pointer"
      id="passwordInfo"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div
      className="dropdown-menu dropdown-menu-left"
      aria-labelledby="passwordInfo"
    >
      {validationMessages[messageType](param)}
    </div>
  </Fragment>
);

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
      <div className="w-100 flex-fill d-flex flex-column">
        <NotificationToaster />
        <div className="form-group w-100 mb-4 login-form-group">
          <div className="d-flex">
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
            {validationPopup("oldPassword")}
          </div>
          {passowordValidation(formError.oldPassword)}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <div className="d-flex">
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
            {validationPopup("newPassword")}
          </div>
          {passowordValidation(formError.newPassword)}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <div className="d-flex">
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
            {validationPopup("confirmPassword")}
          </div>
          {passowordValidation(formError.retypeNewPass)}
        </div>
        <button
          className="btn btn-lg btn-light w-100 mt-4"
          onClick={this.onSubmit}
          disabled={
            formError.oldPassword ||
            formError.newPassword ||
            formError.retypeNewPass
          }
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
      let isValid = field !== "oldPassword" ? validate.password(value) : true;
      if (!isValid) {
        formError[field] = "enter valid password.";
        this.setState({ formError });
        return;
      }
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
      formError[field] = "These passwords don't match. Try again?";
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
      this.validateChangetPasswordForm("oldPassword", oldPassword);
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
