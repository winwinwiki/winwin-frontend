import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addToAppNavigation, removeFromAppNavigation } from '../../actions/sectionHeader/sectionHeaderAction';
import Upload from '../ui/upload';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 12,
            username: "deckyR",
            status: "Active",
            firstname: "Decky",
            lastname: "Redmond",
            email: "decky.redmond-1233@cornell.edu",
            role: "Data Seeder",
            team: "Cornell University",
            isEditable: false,
            userProfileFormError: {
                fullname: '',
                role: '',
                email: ''
            }
        }

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    componentDidMount() {
        this.props.removeFromAppNavigation({
            title: "User Profile",
            path: this.props.match.url
        });
        this.props.removeFromAppNavigation({
            title: "Organisation Management",
            path: '/organizations'
        });
        this.props.addToAppNavigation({
            title: "User Profile",
            path: this.props.match.url
        });
    }
    render() {
        const { username, firstname, lastname, email, role, team, userProfileFormError, isEditable } = this.state;
        let readOnly = isEditable ? '' : 'readOnly';
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-15 mx-auto my-3">
                        {isEditable ? '' : <div className="row">
                            <ul className="action-icons active">
                                <li><a href="javascript:;" onClick={() => this.editUserInfo()}><i className="icon-edit"></i></a></li>
                            </ul>
                        </div>}
                        <div className="mb-4"><h4>{firstname} {lastname}</h4></div>
                        <div className="row">
                            <div className="col-13">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input id="username" type="text"
                                                    placeholder="Username"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="username"
                                                    value={username}
                                                    readOnly="readOnly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="fullname">Full Name</label>
                                                <input id="fullname" type="text"
                                                    placeholder="Full Name"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="fullname"
                                                    value={`${firstname} ${lastname}`}
                                                    readOnly={readOnly} />
                                                {userProfileFormError.fullname && <div className="text-danger small">{userProfileFormError.fullname}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="role">Role</label>
                                                <input id="role" type="text"
                                                    placeholder="Role"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="role"
                                                    value={role}
                                                    readOnly={readOnly} />
                                                {userProfileFormError.role && <div className="text-danger small">{userProfileFormError.role}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="text"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="email"
                                                    value={email}
                                                    readOnly={readOnly} />
                                                {userProfileFormError.email && <div className="text-danger small">{userProfileFormError.email}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="team">Team</label>
                                                <input id="team" type="text"
                                                    placeholder="Team"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="team"
                                                    value={team}
                                                    readOnly={readOnly} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-8 ml-auto">
                                { isEditable ?
                                    <Upload 
                                        type="image" 
                                        accept="image/*"
                                        onDrop={this.onDrop}
                                        text="Upload Photo"/>
                                    : <div class="profilePhoto">Profile Photo</div>}
                            </div>
                        </div>
                        {isEditable ? <div className="row justify-content-center footer-actions active">
                            <button className="btn btn-secondary mt-4" onClick={() => this.cancelUserInfo()}>Cancel</button>
                            <button className="btn btn-primary mt-4" onClick={() => this.saveUserInfo()}>Save</button>
                        </div> : ''}
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

    onDrop = (recievedFiles, rejectedFiles) => {
        // const { file } = this.state;
        // if (rejectedFiles && rejectedFiles.length) {
        //     // this.setState({ dropError: true });
        // }
        // if (!rejectedFiles || !rejectedFiles.length) {
        //     // this.setState({ dropError: false });  
        // }
        // Object.keys(recievedFiles).forEach((key) => {
        //     let reader = new FileReader();
        //     reader.onload = () => {
        //         this.setState({ file: recievedFiles[key] });
        //         this.props.validateDataFeedForm('file', recievedFiles[key]);
        //         // this.props.onFileChange(files, deleteImages);
        //     };
        //     reader.readAsDataURL(recievedFiles[key]);
        // });
    }

    componentWillUnmount(){
        this.props.removeFromAppNavigation({
            title: "User Profile",
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
