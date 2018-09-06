import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addToAppNavigation, removeFromAppNavigation } from '../../../actions/sectionHeader/sectionHeaderAction';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    componentDidMount() {
        this.props.removeFromAppNavigation({
            title: "Change Password",
            path: this.props.match.url
        });
        this.props.removeFromAppNavigation({
            title: "Organisation Management",
            path: '/organizations'
        });
        this.props.addToAppNavigation({
            title: "Change Password",
            path: this.props.match.url
        });
    }
    render() {
        const { username, firstname, lastname, email, role, team, userProfileFormError } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-12 mx-auto my-3">
                        <div className="mb-4"><h4>{firstname} {lastname}</h4></div>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input id="oldPassword" type="password"
                                            className="form-control"
                                            onBlur={this.validateField}
                                            onChange={this.onChange}
                                            name="oldPassword"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input id="newPassword" type="password"
                                            className="form-control"
                                            onBlur={this.validateField}
                                            onChange={this.onChange}
                                            name="newPassword"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="retypeNewPass">Re-type New Password</label>
                                        <input id="retypeNewPass" type="password"
                                            className="form-control"
                                            onBlur={this.validateField}
                                            onChange={this.onChange}
                                            name="retypeNewPass"
                                        />
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
                            <button className="btn btn-secondary mt-4" onClick={() => this.cancelUserInfo()}>Cancel</button>
                            <button className="btn btn-primary mt-4" onClick={() => this.saveUserInfo()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateField(e) {
        // this.props.validateCreateOrgForm(e.target.name, e.target.value);
    }

    editUserInfo() {
        this.setState({
            isEditable: true
        });
    }

    saveUserInfo() {
        this.setState({
            isEditable: false
        })
    }

    cancelUserInfo() {
        this.setState({
            isEditable: false
        })
    }

    componentWillUnmount() {
        this.props.removeFromAppNavigation({
            title: "Change Password",
            path: this.props.match.url
        });
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addToAppNavigation,
    removeFromAppNavigation
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(UserProfile);
