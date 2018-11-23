import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { onLogin } from '../../../actions/auth/loginAction';
import { fetchUserInfo } from '../../../actions/users/userInfoAction';
import validate from '../../../util/validation';
import { startLoaderAction, stopLoaderAction } from '../../../actions/common/loaderActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formError: {
                email: '',
                password: ''
            }
        }

        this.validateForm = this.validateForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    componentDidMount() {
        const { session } = this.props;
        if (session && session.isAuthenticated && session.user) {
            this.changePage(session.user);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { session } = this.props;
        if (nextProps && nextProps.session !== session && nextProps.session.data && !nextProps.session.user && !nextProps.session.error) {
            this.setState({
                email: '',
                password: ''
            });
            this.props.fetchUserInfo();
        }

        if (nextProps && nextProps.session !== session && nextProps.session && nextProps.session.user) {
            this.changePage(nextProps.session.user)
        }
    }

    render() {
        let { email, password, formError } = this.state;
        let { session } = this.props;
        return (
            <div className="w-100 flex-fill d-flex flex-column justify-content-center">

                {session && session.error && <small className="form-element-hint text-danger">{session.data.message}</small>}
                <div className="form-group w-100 mb-4 login-form-group">
                    <label htmlFor="userName" className="sr-only">User Name</label>
                    <input id="userName" type="email" aria-describedby="userNameDesc"
                        placeholder="User Name"
                        className="form-control"
                        onBlur={this.validateForm}
                        onChange={this.onChange}
                        onKeyUp={(e) => this.onKeyUp(e)}
                        name="email"
                        value={email} />
                    {formError.email && <small className="form-element-hint text-danger">{formError.email}</small>}
                </div>
                <div className="form-group w-100 mb-4 login-form-group">
                    <label htmlFor="userPassword" className="sr-only">User Password</label>
                    <input id="userPassword" type="password" aria-describedby="passwordDesc"
                        placeholder="Password"
                        className="form-control"
                        onBlur={this.validateForm}
                        onChange={this.onChange}
                        onKeyUp={(e) => this.onKeyUp(e)}
                        name="password"
                        value={password} />
                    {formError.password && <small className="form-element-hint text-danger">{formError.password}</small>}
                </div>
                <Link to='/forget-password' className="px-4 text-white">Forgot password?</Link>
                <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onLoginSubmit}>Login</button>
            </div>
        )
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onKeyUp(e) {
        if (e.keyCode === 13) { 
            this.onLoginSubmit();
        }
    }

    validateLoginForm = (field, value) => {
        const { formError } = this.state;
        if (field === 'email') {
            if (!value) {
                formError.email = "email is required.";
                this.setState({ formError });
                return;
            }
            let isValid = validate.email(value);
            if (!isValid) {
                formError.email = "enter valid email.";
                this.setState({ formError });
                return;
            }
            formError.email = "";
            this.setState({ formError });
            return;
        }
        if (!value) {
            formError.password = "password is required.";
            this.setState({ formError });
            return;
        }
        let isValidPwd = validate.password(value);
        if (!isValidPwd) {
            formError.password = "enter valid password";
            this.setState({ formError });
            return;
        }
        formError.password = "";
        this.setState({ formError });
        return;
    }

    validateForm(e) {
        this.validateLoginForm(e.target.name, e.target.value);
    }

    onLoginSubmit() {
        // e.preventDefault();
        const { email, password, formError } = this.state;
        if (!email || !password) {
            this.validateLoginForm('email', email);
            this.validateLoginForm('password', password);
            return;
        } else if (formError.password !== '' || formError.email !== '') {
            return;
        }
        this.props.startLoaderAction("Logging in...");
        this.props.onLogin({username: email, password: password});
    }

    changePage(userInfo) {
        switch (userInfo.role) {
            case 'admin':
            case 'seeder':
                this.props.changePage('/organizations');
        }
        this.props.stopLoaderAction();
    }
}

const mapStateToProps = state => ({
    session: state.session,
    userInfo: state.userInfo
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push(page),
    onLogin,
    fetchUserInfo,
    startLoaderAction,
    stopLoaderAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)