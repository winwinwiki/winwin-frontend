import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';import Upload from '../ui/upload';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            isEditable: false,
            userProfileFormError: {
                name: '',
                role: ''
            }
        }

        this.onChange = this.onChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    componentDidMount() {
        const { session } = this.props;
        if (!session || !session.user || !session.isAuthenticated) {
            this.props.history.push("/");
        } else {
            this.setUserInfo();
        }
    }

    componentWillReceiveProps(nextProps){
        const { session } = this.props;
        if(nextProps  && nextProps.session && session.user !== nextProps.session.user && nextProps.session.user){
            this.setState({
                userInfo: nextProps.session.user
            });
        }

        if(nextProps  && nextProps.session !== session && !nextProps.session.user){
            this.props.history.push("/");
        }
    }

    render() {
        const { userInfo, userProfileFormError, isEditable } = this.state;
        const { session } = this.props;
        let readOnly = isEditable ? '' : 'readOnly';
        if (!session || !session.user || !userInfo) { return null; }
        const propUserInfo = this.props.session.user;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-sm-15 mx-auto my-3">
                        {isEditable ? '' : <div className="row">
                            <ul className="action-icons active">
                                <li><a href="javascript:;" onClick={() => this.editUserInfo()}><i className="icon-edit"></i></a></li>
                            </ul>
                        </div>}
                        <div className="mb-4"><h4>{propUserInfo.name}</h4></div>
                        <div className="row">
                            <div className="col-13">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="text"
                                                    placeholder="email"
                                                    className="form-control"
                                                    onChange={this.onChange}
                                                    name="email"
                                                    value={userInfo.email}
                                                    readOnly="readOnly" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="name">Full Name</label>
                                                <input id="name" type="text"
                                                    placeholder="Full Name"
                                                    className="form-control"
                                                    onBlur={this.validateField}
                                                    onChange={this.onChange}
                                                    name="name"
                                                    value={userInfo.name}
                                                    readOnly={readOnly} />
                                                {userProfileFormError.name && <div className="text-danger small">{userProfileFormError.name}</div>}
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
                                                    value={userInfo.role}
                                                    readOnly={readOnly} />
                                                {userProfileFormError.role && <div className="text-danger small">{userProfileFormError.role}</div>}
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
                                                    value={userInfo.team}
                                                    readOnly={readOnly} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-8 ml-auto">
                                {isEditable ?
                                    <Upload
                                        type="image"
                                        accept="image/*"
                                        onDrop={this.onDrop}
                                        text="Upload Photo" />
                                    : <div className="profilePhoto">Profile Photo</div>}
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

    setUserInfo() {
        const { session } = this.props;
        if (session && session.user) {
            this.setState({
                userInfo: session.user
            })
        }
    }

    onChange(e) {
        let userInfo = Object.assign({}, this.state.userInfo, { [e.target.name]: e.target.value });
        this.setState({ userInfo: userInfo });
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
        const { session } = this.props;
        this.setState({
            isEditable: false,
            userInfo: session.user
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
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    session: state.session
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);
