import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    onLogin,
    validateLoginForm
} from '../../../actions/auth/loginAction';

import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }

        this.validateForm = this.validateForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }
    render() {
        let {email, password} = this.state;
        let {isLoginPending, isLoginSuccess, loginError, formError} = this.props;
        return (
            <div className="w-100 flex-fill d-flex flex-column justify-content-center">

                { loginError && <div>{loginError.message}</div> }
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
                  <small id="userNameDesc" className="sr-only">User Name</small>
                  { formError.email && <div className="text-danger small error">{formError.email}</div> }
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
                        value={password}/>
                  <small id="passwordDesc" className="sr-only">User Name</small>
                  { formError.password ? <div className="text-danger small error">{formError.password}</div> : <div>&nbsp;</div> }
                </div>
                <Link to='/forget-password' className="px-4 text-white">Forgot password?</Link>
                    <button className="btn btn-lg btn-light w-100 mt-4" onClick={this.onLoginSubmit}>Login</button>
                </div>
        )
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    onKeyUp(e){
        const _self = this;
        if (e.keyCode === 13) {
            this.props.validateLoginForm(e.target.name, e.target.value).then(
                (res) => {
                    _self.onLoginSubmit(e);
                }
            );
        }
    }

    validateForm(e) {
        this.props.validateLoginForm(e.target.name, e.target.value);
    }

    onLoginSubmit(e) {
        e.preventDefault();
        const {email, password} = this.state;
        const {formError} = this.props;
        if(!email || !password) {
            this.props.validateLoginForm('email', email);
            this.props.validateLoginForm('password', password);
            return;
        } else if (formError.password !== '' || formError.email !== ''){
            return;
        }
        this.props.onLogin(this.state).then( (res) => {
            this.setState({
                email: '',
                password: ''
            });
            if(this.props.isLoginSuccess) { 
                this.props.changePage();
            }
        });
    }
}

const mapStateToProps = state => ({
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError,
    formError: state.login.formError
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/organizations'),
    onLogin,
    validateLoginForm
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)