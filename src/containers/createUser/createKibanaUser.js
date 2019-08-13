import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createKibanaUser } from "../../actions/createUser/createKibanaUser";
import NotificationToaster from "../ui/notificationToaster";
import validate from "../../util/validation";
import { toast } from "react-toastify";
import { ReCaptcha } from "react-recaptcha-google";
import { REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY } from "../../buildConfig/apiConfig";

class CreateKibanaUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        isCaptchaValid: false
      }
    };
  }

  componentDidMount() {
    this.nameInput.focus();
    if (this.captchaDemo) {
      console.log("started, just a second...");
      this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback = recaptchaToken => {
    recaptchaToken &&
      this.setState({
        ...this.state,
        formErrors: { ...this.state.formErrors, isCaptchaValid: true }
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    let userDisplayName = null;
    if (this.state.firstName && !this.state.lastName)
      userDisplayName = this.state.firstName;
    else if (!this.state.firstName && this.state.lastName)
      userDisplayName = this.state.lastName;
    else if (this.state.firstName && this.state.lastName)
      userDisplayName = this.state.firstName + " " + this.state.lastName;

    if (!this.state.email) {
      this.validateForm(e, this.state.email);
      toast.error("Invalid Form!");
      return;
    }

    if (!this.state.formErrors.isCaptchaValid) {
      toast.error("Invalid Form!");
      return;
    }

    this.props.createKibanaUser({
      userDisplayName,
      email: this.state.email
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = e => {
    e && e.preventDefault();
    const { name: field, value } = e.target;
    const { formErrors } = this.state;
    if (field === "email") {
      if (!value) {
        formErrors[field] = "E-mail is required.";
        this.setState({ formErrors });
        return;
      }
      let isValid = validate.email(value);
      if (!isValid) {
        formErrors.email = "Enter a valid email.";
        this.setState({ formErrors });
        return;
      }
      formErrors.email = "";
      this.setState({ formErrors });
      return;
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="w-100 flex-fill d-flex flex-column justify-content-center">
        <NotificationToaster />
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName form-group w-100 mb-4 login-form-group">
              <input
                ref={input => {
                  this.nameInput = input;
                }}
                className="form-control"
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onBlur={this.validateForm}
                onChange={this.onChange}
              />
              {formErrors.firstName.length > 0 && (
                <small className="form-element-hint text-danger">
                  {formErrors.firstName}
                </small>
              )}
            </div>
            <div className="lastName form-group w-100 mb-4 login-form-group">
              <input
                className="form-control"
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onBlur={this.validateForm}
                onChange={this.onChange}
              />
              {formErrors.lastName.length > 0 && (
                <small className="form-element-hint text-danger">
                  {formErrors.lastName}
                </small>
              )}
            </div>
            <div className="email form-group w-100 mb-4 login-form-group">
              <input
                className={
                  formErrors.email.length > 0
                    ? "error form-control"
                    : "form-control"
                }
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onBlur={this.validateForm}
                onChange={this.onChange}
              />
              {formErrors.email.length > 0 && (
                <small className="form-element-hint text-danger">
                  {formErrors.email}
                </small>
              )}
            </div>

            <div className="form-group w-100 mb-4 login-form-group">
              <ReCaptcha
                ref={el => {
                  this.captchaDemo = el;
                }}
                size="normal"
                data-theme="dark"
                render="explicit"
                sitekey={REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.verifyCallback}
              />
            </div>
            <div className="createAccount">
              <button
                className="btn btn-lg btn-light w-100"
                disabled={formErrors.email ? true : false}
                type="submit"
              >
                Create Account
              </button>
              <div
                title="Go to Login Page"
                className="mt-4 cursor-pointer"
                style={{ color: "white" }}
                onClick={() => this.props.changePage()}
              >
                <small>Already Have an Account?</small>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: source => push("/", source),
      createKibanaUser
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(CreateKibanaUser);
