import React, { Fragment } from "react";
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
    const { resetPassword, location: { state } = {} } = this.props;
    if (
      nextProps &&
      nextProps.resetPassword !== resetPassword &&
      nextProps.resetPassword.data
    ) {
      if (!nextProps.resetPassword.error) {
        !nextProps.resetPassword.resendCode &&
          this.props.changePage({ source: "forgotPasswordPage" });
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
    if (resetPassword.error)
      return (
        <div className="mt-4" style={{ color: "white" }}>
          {" "}
          Oops! Something Bad Happened!{" "}
          <span
            className="cursor-pointer"
            style={{ color: "blue" }}
            onClick={() => window.location.reload()}
          >
            Reload
          </span>
        </div>
      );
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
          <small className="form-element-hint text-danger">
            {formError.code && <div>{formError.code}</div>}
          </small>
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
            onBlur={this.validateForm}
            onChange={this.onChange}
            name="password"
            value={password}
          />
          <small id="userNameDesc" className="sr-only">
            Password
          </small>
          <small className="form-element-hint text-danger">
            {formError.password && (
              <Fragment>
                {formError.password}
                <span>
                  <i
                    className="icon-circle-question"
                    id="passwordInfo"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                  <div
                    className="dropdown-menu dropdown-menu-left"
                    aria-labelledby="passwordInfo"
                  >
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
                  </div>
                </span>
              </Fragment>
            )}
          </small>
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
            onBlur={this.validateForm}
            onChange={this.onChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <small id="passwordDesc" className="sr-only">
            confirmPassword
          </small>
          <small className="form-element-hint text-danger">
            {formError.confirmPassword}
          </small>
        </div>
        <button
          className="btn btn-lg btn-light w-100"
          onClick={this.onSubmit}
          disabled={
            formError.code || formError.confirmPassword || formError.password
          }
        >
          Reset
        </button>
        <div className="mt-4" style={{ color: "white" }}>
          {" "}
          Haven't recieved verification email?{" "}
          <span
            className="cursor-pointer"
            style={{ color: "blue" }}
            onClick={this.onResendCode}
          >
            Resend
          </span>
        </div>
      </div>
    );
  }

  onResendCode = e => {
    e.preventDefault();
    const { location: { state: email } = {} } = this.props;
    this.props.onResetPassword({ email }, true);
  };

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
        formError.password = "Password is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.password(value);
      if (!isValid) {
        formError.password = "Enter a valid password.";
        this.setState({ formError });
        return;
      }
      formError.password = "";
      this.setState({ formError });
      return;
    }
    if (!value) {
      formError.confirmPassword = "Confirm password is required.";
      this.setState({ formError });
      return;
    }
    let isValidPwd = validate.confirmPassword(this.state.password, value);
    if (!isValidPwd) {
      formError.confirmPassword = "Password does not match";
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
      changePage: source => push("/", source),
      onResetPassword
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
