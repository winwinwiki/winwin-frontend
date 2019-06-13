import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onResetPassword } from "../../../actions/auth/resetPasswordAction";

import validate from "../../../util/validation";
import NotificationToaster from "../../ui/notificationToaster";

class ResetPassword extends React.Component {
  state = {
    password: "",
    confirmPassword: "",
    code: "",
    formError: {
      password: "",
      confirmPassword: "",
      code: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    const { resetPassword } = this.props;
    if (
      nextProps &&
      nextProps.resetPassword !== resetPassword &&
      nextProps.resetPassword.data
    ) {
      if (!nextProps.resetPassword.error) {
        this.props.changePage();
        this.setState({
          confirmPassword: "",
          password: ""
        });
      }
    }
  }

  render() {
    let { confirmPassword, password, code, formError } = this.state;
    let { resetPassword } = this.props;
    return (
      <div className="w-100 flex-fill d-flex flex-column justify-content-center">
        <NotificationToaster />
        {resetPassword.error && <div>{resetPassword.data}</div>}
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="code" className="sr-only">
            Confirmation Code
          </label>
          <input
            id="code"
            type="text"
            aria-describedby="codeDesc"
            placeholder="Enter Confirmation Code"
            className="form-control"
            // onBlur={this.validateForm}
            onChange={this.onChange}
            name="code"
            value={code}
          />
          <small id="codeDesc" className="sr-only">
            The confirmation code seems to be invalid.
          </small>
          {formError.code && <div>{formError.code}</div>}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="userName" className="sr-only">
            Password
          </label>
          <input
            id="userName"
            type="password"
            aria-describedby="userNameDesc"
            placeholder="Password"
            className="form-control"
            // onBlur={this.validateForm}
            onChange={this.onChange}
            name="password"
            value={password}
          />
          <small id="userNameDesc" className="sr-only">
            Password
          </small>
          {formError.password && <div>{formError.password}</div>}
        </div>
        <div className="form-group w-100 mb-4 login-form-group">
          <label htmlFor="userPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="userPassword"
            type="password"
            aria-describedby="passwordDesc"
            placeholder="Confirm Password"
            className="form-control"
            // onBlur={this.validateForm}
            onChange={this.onChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <small id="passwordDesc" className="sr-only">
            confirmPassword
          </small>
          {formError.confirmPassword ? (
            <div>{formError.confirmPassword}</div>
          ) : (
            <div>&nbsp;</div>
          )}
        </div>
        <button
          className="btn btn-lg btn-light w-100 mt-4"
          onClick={this.onSubmit}
        >
          Reset
        </button>
      </div>
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = e => {
    this.validateResetPasswordForm(e.target.name, e.target.value);
  };

  validateResetPasswordForm = (field, value) => {
    const { formError } = this.state;
    if (field === "password") {
      if (!value) {
        formError.password = "password is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.password(value);
      if (!isValid) {
        formError.password = "enter valid password.";
        this.setState({ formError });
        return;
      }
      formError.password = "";
      this.setState({ formError });
      return;
    }
    if (!value) {
      formError.confirmPassword = "confirm password is required.";
      this.setState({ formError });
      return;
    }
    let isValidPwd = validate.confirmPassword(value);
    if (!isValidPwd) {
      formError.confirmPassword = "password does not match";
      this.setState({ formError });
      return;
    }
    formError.confirmPassword = "";
    this.setState({ formError });
    return;
  };

  onSubmit = e => {
    e.preventDefault();
    const { confirmPassword, password, code } = this.state;
    const { location: { state: email } = {} } = this.props;
    if (!confirmPassword || !password) {
      this.validateResetPasswordForm("confirmPassword", confirmPassword);
      this.validateResetPasswordForm("password", password);
      return;
    }
    this.props.onResetPassword({
      userName: email,
      confirmationCode: code,
      newPassword: password
    });
  };
}

const mapStateToProps = state => ({
  resetPassword: state.resetPassword
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/"),
      onResetPassword
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
