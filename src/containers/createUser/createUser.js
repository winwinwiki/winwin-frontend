import React, { Component } from "react";
import Dropdown from "../ui/dropdown";
import validate from "../../util/validation";

const rolesList = ["Administrator", "Data Seeder"];

class CreateUser extends Component {
  state = {
    fullName: "",
    role: rolesList[0],
    email: "",
    team: "",
    status: "",
    location: null,
    formError: {
      fullName: "",
      email: "",
      team: "",
      status: "",
      location: ""
    }
  };

  componentDidMount() {
    document.title = "New User - WinWin";
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (
      nextProps &&
      nextProps.createUser !== prevState.createUser &&
      nextProps.createUser.data &&
      !nextProps.createUser.error
    ) {
      return {
        fullName: "",
        role: rolesList[0],
        email: "",
        team: ""
      };
    }

    return null;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDropdownChange = (field, value) => {
    this.setState({ [field]: value });
  };

  validateField = e => {
    this.validateCreateUserForm(e.target.name, e.target.value);
  };

  validateCreateUserForm = (field, value) => {
    const { formError } = this.state;
    if (
      field === "fullName" ||
      //   field === "email" ||
      field === "role"
    ) {
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
    if (field === "email") {
      if (!value) {
        formError[field] = "E-mail is required.";
        this.setState({ formError });
        return;
      }
      let isValid = validate.email(value);
      if (!isValid) {
        formError[field] = "Enter valid e-mail.";
        this.setState({ formError });
        return;
      }
      formError[field] = "";
      this.setState({ formError });
      return;
    }
  };

  onCreateUser = () => {
    const { fullName, role, email, team, formError } = this.state;
    if (!email || !role) {
      this.validateCreateUserForm("email", email);
      this.validateCreateUserForm("role", role);
      return;
    }
    const apiObj = {
      userDisplayName: fullName,
      email: email,
      role: role,
      team: team,
      imageUrl: "", //picture attribute in cognito is required,
      isActive: true //by default user is in active status
    };
    this.props.onCreateUser(apiObj);
    this.props.changePage();
  };

  render() {
    const { fullName, role, email, team, formError } = this.state;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-sm-12 mx-auto my-3">
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="fullName"
                      value={fullName}
                    />
                    {formError.fullName && (
                      <div className="text-danger small">
                        {formError.fullName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      type="text"
                      placeholder="E-Mail"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="email"
                      value={email}
                    />
                    {formError.email && (
                      <div className="text-danger small">{formError.email}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <Dropdown
                      selectedItem={role}
                      name="role"
                      containerClass="dropdown dropdown-with-searchbox"
                      onChange={this.onDropdownChange}
                      items={rolesList}
                    />
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
                      aria-describedby="teamDesc"
                      placeholder="Team"
                      className="form-control"
                      onBlur={this.validateField}
                      onChange={this.onChange}
                      name="team"
                      value={team}
                    />
                  </div>
                </div>
              </div>
            </form>

            <button
              className="btn btn-link w-50 mt-4"
              onClick={this.props.history.goBack}
            >
              Cancel
            </button>
            <button
              className="btn btn-lg btn-primary w-50 mt-4"
              onClick={this.onCreateUser}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
